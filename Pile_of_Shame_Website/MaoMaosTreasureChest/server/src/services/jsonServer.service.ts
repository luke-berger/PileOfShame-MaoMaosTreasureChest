import { Item } from '../models/item';

export * as JsonService from './jsonServer.service';

/**
 * Uses the Fetch API to get records from a specified URL.
 * @returns A Promise that resolves to a string representing the retrieved data.
 */

export async function getAllItems(): Promise<Item[]> {
  const hostname = process.env.HOSTNAME;
  const jsonPort: number = parseInt(process.env.JSON_PORT as string);
  const url: string = `http://${hostname}:${jsonPort}/items`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch items: ${response.statusText}`);
  }

  const items: Item[] = await response.json();
  return items;
}

export async function createItem(jsonPayload: string): Promise<string> {
  const hostname = process.env.HOSTNAME;
  const jsonPort: number = parseInt(process.env.JSON_PORT as string);
  const url = `http://${hostname}:${jsonPort}/items`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: jsonPayload,
  });

  if (!response.ok) {
    throw new Error(`Failed to create item: ${response.statusText}`);
  }

  return await response.text();
}
