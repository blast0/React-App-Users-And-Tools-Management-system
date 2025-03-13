import React from "react";

import PopupContainer from "../popup-container";
import PopMenuPortal from "../popup-menu-portal";

function withPopup(WrappedComponent) {
  return class extends React.Component {
    static displayName = `withPopup(${
      WrappedComponent.displayName || WrappedComponent.name || "Component"
    })`;

    render() {
      const {
        nativeElement,
        onOutsideClick,
        outsideClickExcludeSelectors,
        ...restProps
      } = this.props;

      return (
        <PopMenuPortal>
          <PopupContainer
            nativeElement={nativeElement}
            onOutsideClick={onOutsideClick}
            outsideClickExcludeSelectors={outsideClickExcludeSelectors}
          >
            <div className="SubPopup z-50">
              <p className="heading">{restProps.label}</p>
              <WrappedComponent
                {...restProps}
                nativeElement={nativeElement}
                onOutsideClick={onOutsideClick}
              />
            </div>
          </PopupContainer>
        </PopMenuPortal>
      );
    }
  };
}

export default withPopup;
