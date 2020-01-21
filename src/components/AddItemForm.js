import React from "react";
import "./AddItemForm.css";

class AddItemForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imgUrl: "",
      name: "",
      benefits: "",
      uses: "",
      sideEffects: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    // this.getDerivedStateFromProps = this.getDerivedStateFromProps.bind(this);
  }

//   static getDerivedStateFromProps(nextProps, prevState) {
//       debugger;
//     if (nextProps.editItem) {
//       this.setState(nextProps.editItem);
//     }

//     return {
//       show: nextProps.show
//     };
//   }

  handleSubmit(e) {
    e.preventDefault();

    const clone = { ...this.state };
    this.props.handleSubmit(clone);

    this.setState({
      name: "",
      benefits: "",
      uses: "",
      sideEffects: ""
    });

    // TODO: Clone the state values

    // TODO: Emit to parent the new item

    // TODO: Clear the fields
  }

  handleAdd() {
    const item = this.state.itemInput;

    if (item) {
      this.props.onAddItem(item);
    }

    this.setState({
      itemInput: ""
    });
  }

  render() {
    return (
      <div>
        <h3>Fill out the fields below to add a new item to the list</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            required
            value={this.state.imgUrl}
            onChange={e => this.setState({ imgUrl: e.target.value })}
            placeholder="paste image URL here"
          />
          <input
            type="text"
            required
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
            placeholder="name of item"
          />
          <input
            type="text"
            required
            value={this.state.benefits}
            onChange={e => this.setState({ benefits: e.target.value })}
            placeholder="benefits"
          />
          <input
            type="text"
            required
            value={this.state.uses}
            onChange={e => this.setState({ uses: e.target.value })}
            placeholder="uses"
          />
          <input
            type="text"
            required
            value={this.state.sideEffects}
            onChange={e => this.setState({ sideEffects: e.target.value })}
            placeholder="side effects"
          />
          <button
            onClick={this.handleAdd}
            type="submit"
            onSubmit={this.props.handleSubmit}
          >
            submit changes to add it to the list
          </button>
        </form>
      </div>
    );
  }
}

export default AddItemForm;
