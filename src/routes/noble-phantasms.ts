import { Router, Request, Response } from 'express';
import noblePhantasmsJSON from '../../data/noble-phantasms.json';

const noblePhantasmsRouter: Router = Router();

interface NoblePhantasm {
  id: string;
  name: string;
  rank: string;
  owner: string;
  type: string;
}

// GET all noble phantasms (can be filtered by owner and type)
noblePhantasmsRouter.get("/", (req: Request, res: Response) => {
  const type = req.query.type;
  const owner = req.query.owner;
  let filteredNoblePhantasms: Array<NoblePhantasm> = noblePhantasmsJSON;
  try {
    // If statement to check if there is type query
    if (type) {
      filteredNoblePhantasms = filteredNoblePhantasms.filter((np: NoblePhantasm) => np.type === type);
    }
    if (owner) {
      filteredNoblePhantasms = filteredNoblePhantasms.filter((np: NoblePhantasm) => np.owner === owner);
    }
    res.status(200).json(filteredNoblePhantasms);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET noble phantasm by id
noblePhantasmsRouter.get("/id/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    res.status(200).json(noblePhantasmsJSON.filter((np: NoblePhantasm) => np.id === id)[0]);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default noblePhantasmsRouter;
