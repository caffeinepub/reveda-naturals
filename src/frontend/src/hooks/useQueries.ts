import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Product } from "../backend.d";
import { useActor } from "./useActor";

export type ProductWithId = Product & { id: bigint };

export function useGetProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<ProductWithId[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getProducts();
      return result.map(([id, product]) => ({ id, ...product }));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContactForm() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitContactForm(name, email, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contactForms"] });
    },
  });
}
