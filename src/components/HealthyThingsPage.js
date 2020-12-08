import React from "react";
import axios from "axios";
import AddItemForm from "./AddItemForm";
import Search from "./Search";
import Footer from "./Footer";
import CollapsibleItemList from "./CollapsibleItemList";
import "./HealthyThingsPage.css";
import Modal from "./Modal";

class HealthyThingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();

    this.state = {
      list: [],
      sortOrder: "",
      editItem: {},
      search: "",
      show: false,
      active: false,
    };

    this.fetchItems = this.fetchItems.bind(this);
    this.createUpdateItem = this.createUpdateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSearchEnterKeyPress = this.handleSearchEnterKeyPress.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSortOrderChange = this.handleSortOrderChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.displayText = this.displayText.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  fetchItems(options = {}) {
    axios
      .get("https://healthy-api.herokuapp.com/api/items", { params: options })
      .then(response => {
        const list = response.data;
        this.setState({
          list: list
        });
      })
      .catch(error => {
        debugger;
        alert("Cannot locate items");
        //alert error to user
      });
  }

  createUpdateItem(item, mode, id) {
    if (mode === "add") {
      axios
        .post("https://healthy-api.herokuapp.com/api/items", item)
        .then(response => {
          this.fetchItems();
        })
        .catch(error => {
          debugger;
        });
    } else if (mode === "edit") {
        debugger;
      axios
        .put(`https://healthy-api.herokuapp.com/api/items/${id}`, item)
        .then(response => {
          this.fetchItems();
        })
        .catch(error => {});
    }
  }

  deleteItem(id) {
    axios
      .delete(`https://healthy-api.herokuapp.com/api/items/${id}`)
      .then(response => {
        debugger;

        this.fetchItems();
      })
      .catch(error => {
        debugger;
      });
  }

  componentDidMount() {
    this.fetchItems();
  }

  handleDelete(id) {
    debugger;
    this.deleteItem(id);
  }

  handleSearchEnterKeyPress(event) {
    if (event.key === "Enter") {
      const value = event.target.value;

      this.handleSearchChange(value);
    }
  }

  handleSearchChange(value) {
    if (value) {
      const query = { q: value };

      if (this.state.sortOrder) {
        query.orderBy = "name";
        query.orderByValue = this.state.sortOrder;
      }

      this.setState({
        search: value
      });
      this.fetchItems(query);
    } else {
      const query = {};

      if (this.state.sortOrder) {
        query.orderBy = "name";
        query.orderByValue = this.state.sortOrder;
      }

      this.fetchItems(query);
    }
  }

  handleSortOrderChange(event) {
    const value = event.target.value;

    this.setState({
      sortOrder: value
    });

    if (value) {
      const query = {
        orderBy: "name",
        orderByValue: value
      };

      if (this.state.search) {
        query.q = this.state.search;
      }

      this.fetchItems(query);
    } else {
      const query = {};
      if (this.state.search) {
        query.q = this.state.search;
      }
      this.fetchItems(query);
    }
  }

  showModal(e) {
    this.setState({
        show: !this.state.show
    });
  };

  handleInputChange(event) {
    const newValue = event.target.value;
    this.setState({
      Input: newValue
    });
  }

  handleEdit(item) {
    this.setState({
      editItem: item
    });
    this.myRef.current.scrollIntoView();
  }

  displayText = () => {
    this.setState({
      displayTexts: !this.state.displayTexts
    })
  }

  render() {
    return (
      <div>
        <div ref={this.myRef}>
          <h1 className="title">Nature's Marvels</h1>
          <h3 className="subtitle">
            Products from nature that have valuable medical and nutritional
            benefits
          </h3>
        </div>
        <AddItemForm
          handleSubmit={this.createUpdateItem}
          onAdd={this.handleAddItem}
          editItem={this.state.editItem}
        />
        <div className="searchAndSort">
          <Search
            handleChange={this.handleSearchChange}
            handleKeyPress={this.handleSearchEnterKeyPress}
          />
          <h5 className="sort">Sort by name</h5>
          <select
            value={this.state.sortOrder}
            onChange={e => this.handleSortOrderChange(e)}
            className="selectInput"
          >
            <option value=""></option>
            <option value="asc">ASC</option>
            <option value="dsc">DSC</option>
          </select>
        </div>
        <CollapsibleItemList
          items={this.state.list}
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
          className="pageFormat"
        />
        <div className="bottomOfPage">
          <button className="buttonNoImage" onClick={e => {this.showModal(e)}} >Problems with Image?</button>
          <Modal onClose={this.showModal} show={this.state.show}></Modal>
        </div>
        <Footer />
      </div>
    );
  }
}

export default HealthyThingsPage;