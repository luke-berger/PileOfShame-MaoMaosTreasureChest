import { Request, Response } from 'express';
import { Item } from '../models/item';
import filterByCategory from '../services/item.service';
import { JsonService } from '../services/jsonServer.service';

/**
 * Controller class for handling item-related requests
 */
export class ItemController {
  /**
   * Retrieves items based on the search query parameter
   * @param request - The request object.
   * @param response - The response object.
   */
  public async getItem(request: Request, response: Response): Promise<void> {
    try {
      // Extrahiere die Suchparameter (z. B. Kategorien)
      const searchParams = request.query.search as string | undefined;
      const categoryArray = searchParams ? searchParams.split(',') : [];
  
      // Hole alle Items
      const allItems: Item[] = await JsonService.getAllItems();
  
      // Filtere Items basierend auf Kategorien
      const filteredItems: Item[] = filterByCategory(allItems, categoryArray);
  
      // Antwort senden
      response.status(200).json(filteredItems);
    } catch (error) {
      console.error(error);
      response.status(500).send({ error: 'Internal server error' });
    }
  }

  /**
   * Creates a new item and sends the response.
   * @param request - The request object.
   * @param response - The response object.
   */
  public async createItem(request: Request, response: Response): Promise<void> {
    try {
      // Hole die Request-Daten und validiere sie
      const requestData: Item = request.body;
  
      // Überprüfe, ob die Felder korrekt sind
      if (!requestData.name || !requestData.description || !requestData.price || !requestData.categories) {
        response.status(400).send({ error: 'Invalid request data' });
        return;
      }
  
      // Konvertiere das Item in einen JSON-String und sende es an den JSON-Server
      const jsonServerResponse = await JsonService.createItem(JSON.stringify(requestData));
  
      // Erfolgsantwort senden
      response.status(201).send(jsonServerResponse);
    } catch (error) {
      console.error(error);
      response.status(500).send({ error: 'Internal server error' });
    }
  }
}
