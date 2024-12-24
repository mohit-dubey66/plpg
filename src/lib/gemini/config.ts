import { GoogleGenerativeAI } from '@google/generative-ai';

export const API_KEY = 'AIzaSyC56UaMPOLjcMNb9goXU0PTOOTtsvQMeZU';
export const MODEL_NAME = 'gemini-1.5-flash';

export const genAI = new GoogleGenerativeAI(API_KEY);
export const model = genAI.getGenerativeModel({ model: MODEL_NAME });