'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface ResearchTopic {
  id: string;
  timestamp: string;
  topic: string;
  summary: string;
  content: Record<string, any>;
}

export default function ResearchTopicPage() {
  const router = useRouter();
  const { id } = router.query;
  const [topic, setTopic] = useState<ResearchTopic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/research/history/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setTopic(data);
        })
        .catch((err) => {
          setError('Failed to load research topic');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div>Loading research topic...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!topic) {
    return <div>Research topic not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{topic.topic}</h1>
      <p className="text-gray-600 mb-4">
        {new Date(topic.timestamp).toLocaleString()}
      </p>
      <div className="prose">
        <p>{topic.summary}</p>
        {/* Display other content fields if available */}
        {topic.content && Object.keys(topic.content).length > 0 && (
          <div>
            <h2>Research Details</h2>
            <pre>{JSON.stringify(topic.content, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}