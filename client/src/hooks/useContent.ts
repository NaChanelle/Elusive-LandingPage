import { useQuery } from "@tanstack/react-query";

export interface ContentData {
  [key: string]: any;
}

export function useContent(contentFile: string) {
  return useQuery({
    queryKey: [`/content/${contentFile}.json`],
    queryFn: async () => {
      const response = await fetch(`/content/${contentFile}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load content: ${response.status}`);
      }
      return response.json() as ContentData;
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 1
  });
}