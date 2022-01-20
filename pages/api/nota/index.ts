/* eslint-disable import/no-anonymous-default-export */
import { firebase, db, firebaseConfig } from '../../../utils/firebase';
import { Request, Response } from 'express';
import { getDatabase, ref, onValue } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

export default async (req: Request, res: any) => {
  const { method } = req;

  const uuid = uuidv4();

  switch (method) {
    case 'POST':
      try {
        let note: any[] = [];

        await db
          .collection('note')
          .doc(uuid)
          .set({
            id: req.body.id,
            nota: req.body.nota,
          })
          .then(() => {
            db.collection('note')
              .doc(req.body.id)
              .get()
              .then((document) => {
                const arr = document.data();
                res.status(200).json({ succes: true, data: arr });

                db.collection('note')
                  .get()
                  .then((docs) =>
                    docs.forEach((doc) => {
                      if (doc.data().id === req.body.id) {
                        const nota = doc.data().nota;
                        if (nota) {
                          note.push(nota);
                        }
                      }
                    })
                  )
                  .then(() => {
                    note.sort((a, b) => a - b);

                    const min = note.shift();
                    const max = note.pop();
                    console.log('min --', min);
                    console.log('max --', max);

                    note = note.filter((n: number) => n !== min);
                    note = note.filter((n: number) => n !== max);

                    const suma = note.reduce((a, b) => a + b, 0);
                    let medie: any = suma / note.length;

                    medie = (Math.round(medie * 100) / 100).toFixed(2);

                    console.log('filtrat::::::', note);

                    console.log(medie);

                    if (medie === isNaN) {
                      medie = 0;
                    }

                    db.collection('links').doc(req.body.id).update({ medie });

                    res.status(200).json({ succes: true, data: medie });
                  });
              });
          });
      } catch (error) {
        res.status(400).json({ succes: false });
      }
  }
};
