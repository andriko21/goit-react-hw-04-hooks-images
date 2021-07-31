import React, { useEffect, useCallback} from "react";
import style from "./Modal.module.css";

const Modal = ({ closeModal, children }) => {
  const handleBackDropClick = ({ target, currTarget }) => {
    if (target !== currTarget) {
      closeModal();
      return;
    }
  };

  
  // const handleKeyDownClick = (ev) => {
    // if (ev.code === "Escape") {
    //   closeModal();
    //   return;
    // }
  // };

  const handleKeyDownClick = useCallback((ev) => {
    if (ev.code === "Escape") {
      closeModal();
      return;
    }
  },[closeModal])
   


  useEffect(() => {

    window.addEventListener("keydown", handleKeyDownClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDownClick);
    };
  }, [handleKeyDownClick]);

  return (
    <div className={style.Overlay} onClick={handleBackDropClick}>
      <div className={style.Modal}>{children}</div>
    </div>
  );
};

export default Modal;

// class oldModal extends Component {
//   state = {};

//   componentDidMount() {
//     window.addEventListener("keydown", this.handleKeyDownClick);
//   }
//   componentWillUnmount() {
//     window.removeEventListener("keydown", this.handleKeyDownClick);
//   }

//   handleBackDropClick = ({ target, currTarget }) => {
//     if (target !== currTarget) {
//       this.props.closeModal();
//       return;
//     }
//   };
//   handleKeyDownClick = (ev) => {
//     // console.log(ev.code)
//     if (ev.code === "Escape") {
//       console.log(ev.code);
//       this.props.closeModal();
//       return;
//     }
//   };

//   render() {
//     const { children } = this.props;
//     const { handleBackDropClick } = this;
//     return (
//       <div className={style.Overlay} onClick={handleBackDropClick}>
//         <div className={style.Modal}>{children}</div>
//       </div>
//     );
//   }
// }
