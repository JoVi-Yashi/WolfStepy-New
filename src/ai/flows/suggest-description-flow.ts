'use server';
/**
 * @fileOverview A Genkit flow to suggest product descriptions.
 *
 * - suggestDescription - A function to generate a product description.
 * - SuggestDescriptionInput - The input type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SuggestDescriptionInputSchema = z.object({
  title: z.string().describe('The title of the product.'),
  category: z.string().describe('The category the product belongs to.'),
  stage: z.string().describe('The target audience stage (e.g., Juvenil, Adulto, Niños).'),
});
export type SuggestDescriptionInput = z.infer<typeof SuggestDescriptionInputSchema>;

export async function suggestDescription(input: SuggestDescriptionInput): Promise<string> {
    const result = await suggestDescriptionFlow(input);
    return result;
}

const prompt = ai.definePrompt({
  name: 'suggestDescriptionPrompt',
  input: { schema: SuggestDescriptionInputSchema },
  prompt: `You are a creative marketing expert for a modern footwear brand called WolfStep.
Your task is to write a compelling, concise, and attractive product description (maximum 2-3 sentences).
The description should be in Spanish.

Product Details:
- Name: {{{title}}}
- Category: {{{category}}}
- Target Audience: {{{stage}}}

Generate a description that highlights the style, comfort, and target audience for this product.
Do not use markdown or any special formatting. Just return the plain text of the description.
`,
});

const suggestDescriptionFlow = ai.defineFlow(
  {
    name: 'suggestDescriptionFlow',
    inputSchema: SuggestDescriptionInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    const result = await prompt(input);
    return result.text;
  }
);
