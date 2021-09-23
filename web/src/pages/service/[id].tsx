import { NextPage } from "next";
import { useGetUserServiceByIdQuery } from "src/generated/graphql";
import { Wrapper } from "../../components/Wrapper";
import withApollo from "../../utils/apollo/withApollo";
import Image from "next/image";
import transparent from "/public/transparent.png";
import React, { useEffect, useState } from "react";
import { getRandomBetween } from "src/utils";

import gray from "/public/gray.png";
import { OrderModal } from "src/components/order/OrderModal";

import Servicedetailcard from "src/components/servicedetail/Servicedetailcard";
import { Score } from "src/components/servicedetail/Score";
import { Button } from "src/components/htmlElements";

const ServiceDetail: NextPage<{ id: number }> = ({ id }) => {
  const [bgImage, setBgImage] = useState<string | undefined>();
  const { data } = useGetUserServiceByIdQuery({
    variables: { id },
  });
  const userService = data?.getUserServiceById;

  const services = data?.getUserServiceById?.user?.services;
  const service = data?.getUserServiceById.service;
  const images = service?.images?.filter((image) => image.width > 1200);

  services;
  gray;
  useEffect(() => {
    images?.length &&
      setBgImage(images[getRandomBetween(0, images.length)].url);
  }, [images]);

  return (
    <Wrapper navbar fluid className="relative">
      <div style={{ position: "relative", width: "100%", height: "40vw" }}>
        <Image
          className="img-fade opacity-40"
          src={bgImage ?? transparent.src}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="container max-auto  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 absolute top-0 left-0 right-0">
        <Score data={data} rating={Math.random()} />
        <div className="dark:text-white text-black text-4xl ">
          <h1 className="mt-4 ">{service?.name}</h1>
          <div className="mt-4 mb-4 flex flex-wrap   w-full justify-between">
            {userService?.price} {userService?.per}
            <div>
              <div className="flex justify-between items-center">
                <Button
                  icon="star"
                  text={"Chat"}
                  className=" flex justify-center  items-center py-2 px-14 border border-opacity-25 rounded-lg shadow-sm text-sm font-medium text-white bg-purple hover:bg-purple-dark "
                />

                <OrderModal data={data} />
              </div>
              <div className="flex justify-end">
                <Servicedetailcard id={id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

ServiceDetail.getInitialProps = ({ query }) => ({
  id: parseInt(query.id as string),
});

export default withApollo({ ssr: false })(ServiceDetail);
