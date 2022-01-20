import deleteIcon from '../public/deleteIcon.svg';
import emptyStar from '../public/emptyStar.svg';
import fullStar from '../public/fullStar.svg';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';

export default function Livrabile({ data }: { data: any }) {
  useEffect(() => {
    if (data) {
      setLivrabile(data);
    }
  }, [data]);

  const [livrabile, setLivrabile] = useState<any[]>([]);

  return (
    <>
      <div className="container text-center">
        {livrabile &&
          livrabile.map((i: any) => (
            <Item
              nota={i.medie}
              key={i.value}
              id={i.id}
              text={i.value}
              livrabile={livrabile}
              setLivrabile={setLivrabile}
              name={i.createdBy}
            />
          ))}
      </div>
    </>
  );
}

const rating = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Item = ({
  text,
  id,
  livrabile,
  setLivrabile,
  nota,
  name,
}: {
  nota: number;
  name: string;
  text: string;
  id: string;
  livrabile: any[];
  setLivrabile: Dispatch<SetStateAction<any[]>>;
}) => {
  const { user } = useUser();

  const handleDelete = async (id: string) => {
    await fetch('http://localhost:3000/api/firebase/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    setLivrabile(livrabile.filter((l: any) => l.id !== id));
  };

  return (
    <>
      <div className="h-20 w-10/12 bg-gray-300 mx-auto mt-10 rounded-lg shadow-md max-w-lg flex flex-wrap justify-center items-center">
        <h2 className="font-bold mr-10">{isNaN(nota) ? '-' : nota}</h2>
        <div className="">
          <h3 className="font-bold ">{text}</h3>

          {user && user.email !== name && (
            <div className="flex flex-wrap align-middle items-center justify-center">
              {rating.map((r) => (
                <Rate id={id} key={r} nota={r} />
              ))}
            </div>
          )}
        </div>
        {user && user.email === name && (
          <button
            className="ml-5"
            onClick={() => {
              handleDelete(id);
            }}
          >
            <Image src={deleteIcon} width={30} height={30} alt="delete icon" />
          </button>
        )}
      </div>
    </>
  );
};

const Rate = ({ nota, id }: { nota: number; id: string }) => {
  const [hover, setHover] = useState(false);
  const { user } = useUser();

  const handleClick = async () => {
    await fetch('http://localhost:3000/api/nota', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, nota, user: user?.email }),
    });
  };

  return (
    <div
      className="my-2 hover: cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
    >
      <Image
        src={hover ? fullStar : emptyStar}
        width={20}
        height={20}
        alt="delete icon"
      />
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/firebase/');
  const data = await res.json();

  return {
    props: {
      data: data.data,
    },
  };
};
