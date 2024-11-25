import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import Link from 'next/link';
import { Ghost, Edit, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PaperStatus, Paper } from '@prisma/client';
import { AuthSession } from '@/lib/auth/utils';

const SubmittedPapers = ({ session }: {
  session?: AuthSession["session"];
}) => {
  const { data: papers, isLoading } = useQuery({
    queryKey: ['researchPapers'],
    queryFn: async () => {
      const response = await axios.get('/api/dashboard');
      return response.data as Paper[];
    }
  });

  const handlePayment = async (paperId: string) => {
    try {
      await axios.post(`/api/papers/${paperId}/payment`);
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <main className="mx-auto max-w-7xl md:p-10">
      {papers && papers.length !== 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {papers
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((paper) => (
              <li
                key={paper.id}
                className="col-span-1 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-102"
              >
                  <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                    <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg" />
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="truncate text-lg font-medium text-gray-100">
                          {paper.title}
                        </h3>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${
                          paper.status === PaperStatus.APPROVED ? 'bg-green-400' :
                          paper.status === PaperStatus.PENDING ? 'bg-yellow-400' :
                          'bg-gray-400'
                        }`} />
                        <p className="text-sm text-gray-300">
                          Status: {paper.status}
                        </p>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">
                        {format(new Date(paper.updatedAt), "dd MMM yyyy hh:mm a")}
                      </p>
                    </div>
                  </div>
                <div className="px-6 mt-4 grid grid-cols-2 place-items-center py-4 gap-6 border-t border-gray-700">
                  <Link 
                    href={paper.url || ""}
                    target="_blank"
                    className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="text-sm">View Paper</span>
                  </Link>
                  <Button
                    onClick={() => handlePayment(paper.id)}
                    disabled={paper.status !== PaperStatus.APPROVED}
                    className={`flex items-center gap-2 ${
                      paper.status === PaperStatus.APPROVED
                        ? 'bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white'
                        : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    <CreditCard className="h-4 w-4" />
                    <span className="text-sm">Make Payment</span>
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      ) : isLoading ? (
        <div className="mt-16 flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
          <p className="text-gray-300">Loading papers...</p>
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center gap-2 text-gray-300">
          <Ghost className="h-8 w-8" />
          <h3 className="font-semibold text-xl">Pretty empty around here</h3>
          <p>Let&apos;s upload your first Research Paper.</p>
        </div>
      )}
    </main>
  );
};

export default SubmittedPapers;
