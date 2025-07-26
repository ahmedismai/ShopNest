import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from 'react';

export default function useQueryHooks(fn, queryKey = "Products") {
  
  const queryClient = useQueryClient(); 
  const { data, isLoading , isError,refetch} = useQuery({
    queryKey: [queryKey],
    queryFn: fn,
    
  });

  return { data, isLoading, queryClient ,isError,refetch};
}
