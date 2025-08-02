"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { message, notification } from "antd";
import { useAccount } from "wagmi";
import { PlusIcon, GlobeAltIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { PageFeed } from "~~/components/monad-pages/PageFeed";
import { useState } from "react";
import { useScaffoldWriteContract, useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { formatEther } from "ethers";

// Helper function to split a string into chunks of a specific size.
const chunkString = (str: string, size: number): string[] => {
  const numChunks = Math.ceil(str.length / size);
  const chunks = new Array(numChunks);
  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substring(o, size);
  }
  return chunks;
};

// Component for the deployment form
const Deployer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const { address: connectedAddress } = useAccount();

  const { writeContractAsync: deployPage, isPending: isDeploying } = useScaffoldWriteContract("YourContract");

  const handleDeploy = async () => {
    if (!file || !title) {
      notification.error({ message: "Please provide a title and select a file." });
      return;
    }
    if (!connectedAddress) {
      notification.error({ message: "Please connect your wallet to deploy." });
      return;
    }

    const notificationId = message.loading("Reading and preparing your file...");

    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");

    reader.onload = async readerEvent => {
      try {
        const content = readerEvent.target?.result as string;
        const CHUNK_SIZE = 24 * 1024; // 24KB chunks
        const contentChunks = chunkString(content, CHUNK_SIZE);

        message.loading("Please confirm in your wallet...");

        await deployPage({
          functionName: "deployPage",
          args: [title, contentChunks, file.type],
        });

        notification.success({ message: "Page deployed successfully!" });
        setTitle("");
        setFile(null);
      } catch (error: any) {
        notification.error({ message: `Error: ${error.shortMessage || error.message}` });
        console.error("Error deploying page:", error);
      }
    };
    reader.onerror = () => {
      notification.error({ message: "Error reading the selected file." });
    };
  };

  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl">Create a New Page</h2>
        <p>Immortalize your content on the blockchain.</p>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Page Title</span>
          </label>
          <input
            type="text"
            placeholder="e.g., My Awesome Portfolio"
            className="input input-bordered w-full"
            value={title}
            onChange={e => setTitle(e.target.value)}
            disabled={isDeploying}
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Content File</span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            onChange={e => e.target.files && setFile(e.target.files[0])}
            accept=".html,.htm,.js,.css,.txt,.md"
            disabled={isDeploying}
          />
          {file && <span className="text-xs mt-1">Selected: {file.name}</span>}
        </div>
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary" onClick={handleDeploy} disabled={isDeploying}>
            {isDeploying ? <span className="loading loading-spinner"></span> : "Deploy Page"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Component for a single page card in the feed
const PageCard: React.FC<{ page: any }> = ({ page }) => {
  const [tipAmount, setTipAmount] = useState("0.01");
  const { writeContractAsync: sendTip, isPending: isTipping } = useScaffoldWriteContract("YourContract");

  const handleSendTip = async () => {
    try {
      await sendTip({
        functionName: "tip",
        args: [page.id],
        value: BigInt(parseFloat(tipAmount) * 1e18),
      });
      notification.success({ message: "Tip sent successfully!" });
    } catch (error: any) {
      notification.error({ message: `Error: ${error.shortMessage || error.message}` });
      console.error("Error sending tip:", error);
    }
  };

  return (
    <div className="card bg-base-200 shadow-md transition-shadow hover:shadow-lg">
      <div className="card-body">
        <h3 className="card-title text-lg truncate">
          <Link href={`/page/${page.id.toString()}`} className="link link-hover">
            {page.title}
          </Link>
        </h3>
        <div className="text-sm text-base-content/70">
          <p>
            by <Address address={page.owner} size="xs" />
          </p>
          <p>ID: {page.id.toString()}</p>
          <p>Size: {Number(page.totalSize)} bytes</p>
          <p>
            Created: {new Date(Number(page.createdAt) * 1000).toLocaleString()}
          </p>
          <p>
            Total Tips: {formatEther(page.totalTips)} ETH
          </p>
        </div>
        <div className="card-actions justify-end items-center mt-2">
          <div className="join">
            <input
              type="number"
              className="input input-sm input-bordered join-item w-24"
              value={tipAmount}
              onChange={e => setTipAmount(e.target.value)}
              step="0.01"
              min="0.001"
              disabled={isTipping}
            />
            <button className="btn btn-secondary btn-sm join-item" onClick={handleSendTip} disabled={isTipping}>
              {isTipping ? <span className="loading loading-spinner-xs"></span> : "Tip"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  const { data: allPages, isLoading: isLoadingPages } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "getAllPages",
    watch: true, // Automatically refetches when the contract state changes
  });

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5 w-full max-w-4xl">
          <h1 className="text-center mb-8">
            <span className="block text-4xl font-bold">Monad Pages</span>
            <span className="block text-lg">On-Chain Content Publishing</span>
          </h1>

          <div className="mb-12">
            <Deployer />
          </div>

          <h2 className="text-center text-2xl font-bold mb-6">Live Feed</h2>

          {isLoadingPages ? (
            <div className="text-center">
              <span className="loading loading-lg"></span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allPages && allPages.length > 0 ? (
                allPages.map(page => <PageCard key={page.id.toString()} page={page} />)
              ) : (
                <p className="text-center col-span-full">No pages deployed yet. Be the first!</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
