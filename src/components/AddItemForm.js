import React from "react";
import "./AddItemForm.css";
// import './Responsive.css';

class AddItemForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imgUrl: "",
      name: "",
      benefits: "",
      uses: "",
      sideEffects: "",
      mode: "add" //'edit'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.editItem) {
      if (
        prevProps.editItem.imgUrl !== this.props.editItem.imgUrl ||
        prevProps.editItem.name !== this.props.editItem.name ||
        prevProps.editItem.benefits !== this.props.editItem.benefits ||
        prevProps.editItem.uses !== this.props.editItem.uses ||
        prevProps.editItem.sideEffects !== this.props.editItem.sideEffects
      ) {
        this.setState({
          imgUrl: this.props.editItem.imgUrl,
          name: this.props.editItem.name,
          benefits: this.props.editItem.benefits,
          uses: this.props.editItem.uses,
          sideEffects: this.props.editItem.sideEffects,
          mode: "edit"
        });
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const item = {
      imgUrl: this.state.imgUrl,
      name: this.state.name,
      benefits: this.state.benefits,
      uses: this.state.uses,
      sideEffects: this.state.sideEffects,
    };

    debugger;

    this.props.handleSubmit(item, this.state.mode, this.props.editItem._id);

    this.setState({
      imgUrl: "",
      name: "",
      benefits: "",
      uses: "",
      sideEffects: "",
      mode: "add"
    });
  }


  render() {
    return (
      <div className="addFormBackground">
        <h4 className="add">Fill out the fields below to add a new item to the list</h4>
        <form onSubmit={this.handleSubmit} className="addForm">
          <label className="inputFieldLabels">Image URL</label>
          <input
            type="text"
            required
            value={this.state.imgUrl}
            onChange={e => this.setState({ imgUrl: e.target.value })}
            placeholder="paste image URL here"
            className="inputFields"
          />
          <label className="inputFieldLabels">Name</label>
          <input
            type="text"
            required
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
            placeholder="name of item"
            className="inputFields"
          />
          <label className="inputFieldLabels">Benefits</label>
          <input
            type="text"
            required
            value={this.state.benefits}
            onChange={e => this.setState({ benefits: e.target.value })}
            placeholder="benefits"
            className="inputFields"
          />
          <label className="inputFieldLabels">Uses</label>
          <input
            type="text"
            required
            value={this.state.uses}
            onChange={e => this.setState({ uses: e.target.value })}
            placeholder="uses"
            className="inputFields"
          />
          <label className="addItemFormLabels">Side Effects</label>
          <input
            type="text"
            required
            value={this.state.sideEffects}
            onChange={e => this.setState({ sideEffects: e.target.value })}
            placeholder="side effects"
            className="inputFields"
          />
          <button type="submit" className="button">
            {this.state.mode === "add" ? "Add" : "Update"}
          </button>
        </form>
      </div>
    );
  }
}

export default AddItemForm;
