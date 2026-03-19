import { Request, Response, NextFunction } from 'express';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

dotenv.config();
const prisma = new PrismaClient();

export const app = express();
export default prisma;

app.use(cors());
app.use(express.json());

// Set up Multer for file upload
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.pdf' && ext !== '.doc' && ext !== '.docx') {
      return cb(new Error('Only PDF and DOC/DOCX files are allowed'));
    }
    cb(null, true);
  }
});

const port = 3010;

app.post('/api/candidates', upload.single('cv'), async (req, res) => {
  try {
    const { firstName, lastName, email, phone, address, education, workExperience } = req.body;
    
    // Validate required fields
    if (!firstName || !lastName || !email || !address || !education || !workExperience) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if CV file was provided
    if (!req.file) {
      return res.status(400).json({ error: 'CV file is required' });
    }

    const newCandidate = await prisma.candidate.create({
      data: {
        firstName,
        lastName,
        email,
        phone: phone || '',
        address,
        education,
        workExperience,
        cvFilePath: req.file.path
      }
    });

    res.status(201).json({ message: 'Candidate added successfully', candidate: newCandidate });
  } catch (error: any) {
    if (error.code === 'P2002') {
       return res.status(400).json({ error: 'Email already exists' });
    }
    console.error(error);
    res.status(500).json({ error: 'Failed to add candidate. Please try again.' });
  }
});

app.get('/', (req, res) => {
  res.send('Hola LTI!');
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.type('text/plain'); 
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
