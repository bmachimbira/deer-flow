// Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
// SPDX-License-Identifier: MIT

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface ResearchTopic {
  id: string;
  timestamp: string;
  topic: string;
  summary: string;
}

interface ResearchHistoryProps {
  className?: string;
}

export function ResearchHistory({ className }: ResearchHistoryProps) {
  const [history, setHistory] = useState<ResearchTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/research/history')
      .then((response) => response.json())
      .then((data) => {
        if (data.history) {
          setHistory(data.history);
        } else {
          setError('No research history found');
        }
      })
      .catch((err) => {
        setError('Failed to load research history');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className={`p-4 ${className}`}>Loading research history...</div>;
  }

  if (error) {
    return <div className={`p-4 text-red-500 ${className}`}>{error}</div>;
  }

  if (history.length === 0) {
    return (
      <div className={`p-4 ${className}`}>
        No research topics found. Start researching a new topic!
      </div>
    );
  }

  return (
    <div className={`p-4 ${className}`}>
      <h2 className="text-2xl font-bold mb-4">Research History</h2>
      <ul>
        {history.map((topic) => (
          <li key={topic.id} className="mb-2">
            <Link href={`/research/${topic.id}`}>
              <a className="text-blue-500 hover:underline">
                {new Date(topic.timestamp).toLocaleDateString()}: {topic.topic}
              </a>
            </Link>
            <p className="text-gray-600 text-sm">{topic.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}