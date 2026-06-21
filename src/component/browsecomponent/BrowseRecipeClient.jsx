'use client';

import React, { useState } from 'react';
import { Pagination } from '@heroui/react';
import PopularRecipeCard from '@/component/homepage/PopularRecipeCard';
import SelectDropdown from '@/component/browsecomponent/SelectDropdown';

export default function BrowseRecipeClient({ initialData = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(initialData.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecipes = initialData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="w-11/12 max-w-7xl mx-auto py-6 md:py-10">
      {/* হেডার ও ড্রপডাউন সেকশন */}
      <div className="flex flex-col md:flex-row items-center justify-between py-6">
        <div>
          <h1 className="text-2xl text-white font-bold md:text-3xl lg:text-4xl">
            Explore Recipes
          </h1>
        </div>

        <div>
          <SelectDropdown />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 min-h-[500px] items-start">
        {currentRecipes.map(recipe => (
          <PopularRecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-12 flex justify-center border-t border-orange-950/20 pt-6">
          <Pagination className="justify-center">
            <Pagination.Content>
              {/* Previous Button */}
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={currentPage === 1}
                  onPress={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  className="text-white hover:bg-orange-500/20"
                >
                  <Pagination.PreviousIcon />
                  <span>Previous</span>
                </Pagination.Previous>
              </Pagination.Item>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                pageNumber => (
                  <Pagination.Item key={pageNumber}>
                    <Pagination.Link
                      isActive={pageNumber === currentPage}
                      onPress={() => setCurrentPage(pageNumber)}
                      className={`${
                        pageNumber === currentPage
                          ? 'bg-orange-500 text-white font-bold'
                          : 'text-gray-400 hover:bg-white/5'
                      }`}
                    >
                      {pageNumber}
                    </Pagination.Link>
                  </Pagination.Item>
                ),
              )}

              {/* Next Button */}
              <Pagination.Item>
                <Pagination.Next
                  isDisabled={currentPage === totalPages}
                  onPress={() =>
                    setCurrentPage(p => Math.min(p + 1, totalPages))
                  }
                  className="text-white hover:bg-orange-500/20"
                >
                  <span>Next</span>
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </div>
      )}
    </div>
  );
}
