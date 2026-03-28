'use server';
/**
 * @fileOverview An AI agent that provides personalized digital asset recommendations.
 *
 * - recommendProducts - A function that handles the product recommendation process.
 * - AiPoweredProductRecommendationsInput - The input type for the recommendProducts function.
 * - AiPoweredProductRecommendationsOutput - The return type for the recommendProducts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductSchema = z.object({
  id: z.string().describe('Unique identifier for the product.'),
  title: z.string().describe('The title of the product.'),
  description: z.string().describe('A short description of the product.'),
});

const AiPoweredProductRecommendationsInputSchema = z.object({
  userInterests: z
    .string()
    .describe('A description of the user\'s interests or browsing patterns.'),
  availableProducts: z
    .array(ProductSchema)
    .describe('A list of products available in the marketplace.'),
});
export type AiPoweredProductRecommendationsInput = z.infer<
  typeof AiPoweredProductRecommendationsInputSchema
>;

const AiPoweredProductRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(ProductSchema)
    .describe('A list of recommended products based on user interests.'),
});
export type AiPoweredProductRecommendationsOutput = z.infer<
  typeof AiPoweredProductRecommendationsOutputSchema
>;

export async function recommendProducts(
  input: AiPoweredProductRecommendationsInput
): Promise<AiPoweredProductRecommendationsOutput> {
  return aiPoweredProductRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPoweredProductRecommendationsPrompt',
  input: {schema: AiPoweredProductRecommendationsInputSchema},
  output: {schema: AiPoweredProductRecommendationsOutputSchema},
  prompt: `You are an AI assistant for NovaAssets, a digital product marketplace. Your task is to recommend digital assets to users based on their expressed interests from the available products.

User's interests: "{{{userInterests}}}"

Available products:
{{#each availableProducts}}
- ID: {{{this.id}}}
  Title: {{{this.title}}}
  Description: {{{this.description}}}
{{/each}}

Please recommend 3-5 products from the 'Available products' list that best match the user's interests. Only recommend products that are explicitly listed above. Respond in JSON format according to the output schema.`,
});

const aiPoweredProductRecommendationsFlow = ai.defineFlow(
  {
    name: 'aiPoweredProductRecommendationsFlow',
    inputSchema: AiPoweredProductRecommendationsInputSchema,
    outputSchema: AiPoweredProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
