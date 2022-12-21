import { Component } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";
import { PetAPIResponse, Animal } from "./APIResponsesTypes";

class Details extends Component<{ params: { id?: string } }> {
  // constructor(props) {
  //   super(props)
  //   this.state = { loading: true }
  // }

  state = {
    loading: true,
    showModal: false,
    animal: "" as Animal,
    breed: "",
    city: "",
    name: "",
    state: "",
    description: "",
    images: [] as string[],
  };

  async componentDidMount() {
    if (this.props.params.id) {
      const res = await fetch(
        `https://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
      );
      const json = (await res.json()) as PetAPIResponse;
      this.setState({ loading: false, ...json.pets[0] });
    }
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  render() {
    const { name, breed, animal, images, city, state, description, showModal } =
      this.state;
    if (this.state.loading) return <h2>Loading...</h2>;
    else
      return (
        <div className="details">
          <Carousel images={images} />
          <div className="">
            <h1>{name}</h1>
            <h2>
              {animal} – {breed} – {city}, {state}
            </h2>
            <ThemeContext.Consumer>
              {([theme]) => (
                <button
                  onClick={this.toggleModal}
                  style={{ background: theme }}
                >
                  Adopt {name}
                </button>
              )}
            </ThemeContext.Consumer>

            <p>{description}</p>
            {/* MODAL */}
            {showModal ? (
              <Modal>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <ThemeContext.Consumer>
                    {([theme]) => (
                      <a
                        className="btn"
                        style={{ background: theme }}
                        href="https://bit.ly/pet-adopt"
                      >
                        Yes
                      </a>
                    )}
                  </ThemeContext.Consumer>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </Modal>
            ) : null}
          </div>
        </div>
      );
  }
}

const WrappedDetails = () => {
  const params = useParams<{ id: string }>();

  return (
    <ErrorBoundary>
      <Details params={params} />
    </ErrorBoundary>
  );
};

export default WrappedDetails;
