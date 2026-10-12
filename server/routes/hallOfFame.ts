import { Router, Request, Response } from 'express';
import { dbService } from '../db';

const router = Router();

// GET /api/hall-of-fame - Public list of published Hall of Fame entries
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category, season, featured } = req.query;

    const entries = await dbService.getHallOfFame({
      publishedOnly: true,
      gameCategory: category ? String(category) : undefined,
      season: season ? String(season) : undefined,
      featuredOnly: featured === 'true' ? true : undefined,
    });

    return res.json({ success: true, data: entries });
  } catch (err: any) {
    console.error('Error fetching Hall of Fame entries:', err);
    return res.status(500).json({ success: false, error: 'Failed to fetch Hall of Fame gallery.' });
  }
});

export default router;
