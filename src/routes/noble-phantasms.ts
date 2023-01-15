import { Router, Request, Response } from 'express';
import noblePhantasmsJSON from '../../data/noble-phantasms.json';

const noblePhantasmsRouter: Router = Router();

interface NoblePhantasm {
  id: string;
  name: string;
  rank: string;
}

// GET all noble phantasms
noblePhantasmsRouter.get("/", (req: Request, res: Response) => {
  try {
    res.status(200).json(noblePhantasmsJSON);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET noble phantasm by id
noblePhantasmsRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    res.status(200).json(noblePhantasmsJSON.filter((np: NoblePhantasm) => np.id === id))
  } catch (err) {
    res.status(500).send(err);
  }
});

export default noblePhantasmsRouter;
