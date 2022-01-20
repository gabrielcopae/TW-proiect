/* eslint-disable import/no-anonymous-default-export */
import { firebase, db, firebaseConfig } from '../../../utils/firebase';
import { Request, Response } from 'express';
import { getDatabase, ref, onValue } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

export default async (req: Request, res: any) => {
  const { method } = req;

  let ok = false;
  const uuid = uuidv4();

  const transfer = {
    id: uuid,
    value: req.body.link,
    createdBy: req.body.user,
  };

  switch (method) {
    case 'POST':
      try {
        console.log('post try');

        await db.collection('links').doc(uuid).set(transfer);

        res.status(200).json({ succes: true, data: transfer });
      } catch (error) {
        res.status(400).json({ succes: false });
      }
      break;
    case 'GET':
      try {
        const snapshot = await db.collection('links').get();

        const collection = snapshot.docs.map((doc) => doc.data());

        res.status(200).json({ succes: true, data: collection });
      } catch (error) {
        res.status(400).json({ succes: false });
      }
      break;

    case 'DELETE':
      try {
        try {
          console.log(req.body.id);

          await db.collection('links').doc(req.body.id).delete();

          res.status(200).json({ succes: true });
        } catch (error) {
          res.status(400).json({ succes: false });
        }
        break;
      } catch (error) {}

    case 'PUT':
      try {
        const nota = req.body.nota;

        await db
          .collection('links')
          .doc(req.body.id)
          .update({
            note: firebase.firestore.FieldValue.arrayUnion(nota),
          })
          .then(() => {
            db.collection('links')
              .doc(req.body.id)
              .get()
              .then((document) => {
                const arr = document.data()?.note;
                console.log(arr);
                res.status(200).json({ succes: true });
              });

            // arr.sort();
            // const min = arr.shift();
            // const max = arr.pop();

            // arr.filter((n: number) => n !== min || n !== max);
          });

        // let iterator = 0;
        // let suma = 0;

        // document.data()?.note.forEach((n: number) => {
        //   iterator++;

        //   suma += n;
        // });
      } catch (error) {
        res.status(400).json({ succes: false });
      }

    default:
      res.status(400).json({ succes: false });
      break;
  }
};
