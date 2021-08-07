import React, { Dispatch, SetStateAction, useState } from 'react';
import { useGetAllGamesQuery } from 'src/generated/graphql';
import { Loading } from 'src/components/utils/Loading';
import { Button, Modal } from 'src/components/htmlElements';

export type GameModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const GameModal: React.FC<GameModalProps> = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { data, loading } = useGetAllGamesQuery();

  return (
    <>
      <Button text='add Game' onClick={() => setOpen(!open)} />
      <Modal open={open} setOpen={setOpen}>
        <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full sm:p-6'>
          <button></button>
          <ul
            role='list'
            className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8'
          >
            {!loading && data && data.getAllGames ? (
              data?.getAllGames.map(
                ({ id, boxArtUrl, name, genres, multiplayer_modes }) => (
                  <li
                    key={id}
                    className='col-span-1 flex flex-col text-center divide-y'
                  >
                    <div className='flex-1 flex flex-col'>
                      <img
                        className='flex-shrink-0 mx-auto '
                        src={boxArtUrl}
                        alt=''
                      />
                      <h3 className='mt-6 text-black text-sm font-medium'>
                        {name}
                      </h3>
                    </div>
                  </li>
                )
              )
            ) : (
              <Loading />
            )}
          </ul>
        </div>
      </Modal>
    </>
  );
};
