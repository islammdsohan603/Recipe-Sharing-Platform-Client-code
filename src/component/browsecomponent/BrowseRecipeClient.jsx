'use client';

import React from 'react';
import { Pagination } from '@heroui/react';
import PopularRecipeCard from '@/component/homepage/PopularRecipeCard';
import SelectDropdown from '@/component/browsecomponent/SelectDropdown';
import { useRouter, useSearchParams } from 'next/navigation';

export default function BrowseRecipeClient({ initialData = { recipes: [], total: 0, page: 1, limit: 8 }, initialPage = 1, initialCategories = "" }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { recipes = [], total = 0, limit = 8 } = initialData;
  const totalPages = Math.ceil(total / limit) || 1;

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage);
    router.push(`?${params.toString()}`);
  };

  const handleCategoryChange = (category) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', 1);
    if (category) {
      params.set('categories', category);
    } else {
      params.delete('categories');
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-11/12 max-w-7xl mx-auto py-6 md:py-10">
      <div className="flex flex-col md:flex-row items-center justify-between py-6">
        <div>
          <h1 className="text-2xl text-white font-bold md:text-3xl lg:text-4xl">
            Explore Recipes
          </h1>
        </div>
        <div>
          <SelectDropdown selectedCategory={initialCategories} onCategoryChange={handleCategoryChange} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 min-h-[500px] items-start">
        {recipes.map(recipe => (
          <PopularRecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-12 flex justify-center border-t border-orange-950/20 pt-6">
          <Pagination className="justify-center">
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={initialPage === 1}
                  onPress={() => handlePageChange(Math.max(initialPage - 1, 1))}
                  className="text-white hover:bg-orange-500/20"
                >
                  <Pagination.PreviousIcon />
                  <span>Previous</span>
                </Pagination.Previous>
              </Pagination.Item>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                <Pagination.Item key={pageNumber}>
                  <Pagination.Link
                    isActive={pageNumber === initialPage}
                    onPress={() => handlePageChange(pageNumber)}
                    className={`${
                      pageNumber === initialPage
                        ? 'bg-orange-500 text-white font-bold'
                        : 'text-gray-400 hover:bg-white/5'
                    }`}
                  >
                    {pageNumber}
                  </Pagination.Link>
                </Pagination.Item>
              ))}

              <Pagination.Item>
                <Pagination.Next
                  isDisabled={initialPage === totalPages}
                  onPress={() => handlePageChange(Math.min(initialPage + 1, totalPages))}
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
