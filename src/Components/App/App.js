import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchApi from "../SearchApi/SearchApi";
import ImageGallary from "../ImageGallery/ImageGallery";
import Button from "../Button/Button";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import LoaderFunc from "../Loader/Loader";
import Modal from "../Modal/Modal";
import style from "./App.module.css";

const App = () => {
  const [state, setState] = useState({
    query: "",
    imageCollection: [],
    page: 1,
    btnVisible: false,
    loaderStatus: false,
    showModal: false,
    modalImg: {
      url: null,
      alt: null,
    },
  });

  const onChangeQwery = async (ev) => {
    setState((prevState) => ({
      ...prevState,
      loaderStatus: true,
    }));

    if (!ev.trim().length) {
      alert("Please enter a valid string!");
      return;
    }

    const res = await (await SearchApi(ev, state.page)).data.hits;
    setState((prevState) => ({
      ...prevState,
      page: 1,
      query: ev,
      loaderStatus: false,
      imageCollection: [...res],
      btnVisible: true,
    }));
  };

  const incerement = () => {
    setState((prevState) => ({
      ...prevState,
      page: prevState.page + 1,
    }));
  };

  const openModal = ({ target, currTarget }) => {
    if (target === currTarget) {
      return;
    }
      console.log('Упсс')

    setState((prevState) => ({
      ...prevState,
      showModal: true,
      modalImg: {
        url: target.getAttribute('data'),
        alt: target.getAttribute('alt'),
      },
    }));
  };

  const closeModal = () => {

    setState((prevState) => ({
     ...prevState,
      showModal: false,
    }));
  };

  useEffect(() => {
    if (state.query.trim() === "") {
      return;
    }
    setState((prevState) => ({
      ...prevState,
      loaderStatus: true,
    }));
    (async () => {
      try {
        const resolveParse = await SearchApi(state.query, state.page);

        if (resolveParse.data.total === 0) {
          throw Error("Required");
        }

        setState((prevState) => ({
          ...prevState,
          imageCollection: [
            ...prevState.imageCollection,
            ...resolveParse.data.hits,
          ],
          loaderStatus: false,
        }));

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });

      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          btnVisible: false,
        }));
        console.log(error.message);
      }
    })();
  }, [state.page, state.query]);

  return (
    <div className={style.App}>
      <SearchBar onSubmit={onChangeQwery} />
      <ImageGallary images={state.imageCollection} openModal={openModal} />
      {state.loaderStatus && <LoaderFunc />}
      {state.showModal && (
          <Modal closeModal={closeModal}>
            <img src={state.modalImg.url} alt={state.modalImg.alt} className={ style.modalImg}/>
          </Modal>
        )}
      {state.btnVisible && <Button newImages={incerement} />}
    </div>
  );
};

export default App;
