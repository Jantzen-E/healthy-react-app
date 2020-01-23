import React from "react";
import axios from "axios";
import AddItemForm from "./AddItemForm";
import Search from "./Search";
import Footer from "./Footer";
import CollapsibleItemList from "./CollapsibleItemList";
import "./HealthyThingsPage.css";
import qs from "qs";

class HealthyThingsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // originalList: [
      //     { imgUrl: 'https://i.imgur.com/2J4RQc2.jpg',
      //         name: 'Ginger',
      //         benefits: 'helps reduce nausea, relieves aches, and lowers cholesterol',
      //         uses: 'you ingest ginger to reap the benefits from it',
      //         sideEffects: 'do not take high doses if pregnant, can cause heartburn and/or diarrhea for some people'
      //     },
      //     { imgUrl: 'https://i.imgur.com/YH1c7RA.jpg',
      //         name: 'Aloe Vera',
      //         benefits: 'helps burns heal faster, and lowers blood sugar',
      //         uses: 'can be used topically on skin or ingested to recieve the medicinal benefits',
      //         sideEffects: 'can cause stomach pain if too much is ingested'
      //     },
      //     { imgUrl: 'https://i.imgur.com/5uvp8m2.jpg',
      //         name: 'Snake Plant',
      //         benefits: 'purifies air, reduces carbon monoxide, and eliminated toxins out of the air',
      //         uses: 'buy several for where you live and place them in locations around the living space to purify the air',
      //         sideEffects: 'the snake plant is poisonous if ingested so if you have pets or small children then keep it out of reach'
      //     },
      //     { imgUrl: 'https://i.imgur.com/E3Lvrlr.jpg',
      //         name: 'Pumpkin',
      //         benefits: 'contains many vitamins that are good for your immune system and eyesight',
      //         uses: 'can be ingested to reap the benefits',
      //         sideEffects: 'if too much is ingested, the beta carotene can cause skin to appear orange or yellowish'
      //     },
      //     { imgUrl: 'https://i.imgur.com/fEs3KuA.jpg',
      //         name: 'Oregano',
      //         benefits: 'helps fight bacteria and viral infections, helps to decrease inflammation',
      //         uses: 'topically or orally',
      //         sideEffects: 'can cause a skin rash when applied topically'
      //     },
      //     { imgUrl: 'https://i.imgur.com/5J6ya3Q.jpg',
      //         name: 'Chamomile',
      //         benefits: 'helps with heartburn and inflammation',
      //         uses: 'can be used topically on skin or can be ingested in tea etc.',
      //         sideEffects: 'can cause vomiting if taken in very large doses'
      //     },
      //     { imgUrl: 'https://i.imgur.com/ADVgOPU.jpg',
      //         name: 'Watermelon Juice',
      //         benefits: 'hydrates your body, helps with muscle soreness, helps to prevent mascular degeneration',
      //         uses: 'drink the juice to receive the benefits from watermelon',
      //         sideEffects: 'could cause diarrhea if taken in large amounts'
      //     },
      //     { imgUrl: 'https://i.imgur.com/XakqzTP.jpg',
      //         name: 'Cacao',
      //         benefits: 'contains iron, magnesium, and calcium that help your heart and brain, it is an anti-depressant',
      //         uses: 'ingest cacao to reap the benefits from it, most commonly found in a powdered form',
      //         sideEffects: 'could cause nervousness and a slightly faster heartbeat from the caffeine contained in cacao'
      //     },
      // ],
      list: [],
      sortOrder: "",
      editItem: {},
      search: ""
    };

    this.fetchItems = this.fetchItems.bind(this);
    this.createUpdateItem = this.createUpdateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    //TODO: write an update function
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSearchEnterKeyPress = this.handleSearchEnterKeyPress.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSortOrderChange = this.handleSortOrderChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  fetchItems(options = {}) {
    axios
      .get("http://localhost:3000/api/items", { params: options })
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
        .post("http://localhost:3000/api/items", item)
        .then(response => {
          this.fetchItems();
        })
        .catch(error => {
          debugger;
        });
    } else if (mode === "edit") {
        debugger;
      axios
        .put(`http://localhost:3000/api/items/${id}`, item)
        .then(response => {
          this.fetchItems();
        })
        .catch(error => {});
    }
  }

  deleteItem(id) {
    axios
      .delete(`http://localhost:3000/api/items/${id}`)
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
    // const list = [...this.state.originalList];

    // this.setState({
    //     list: list
    // });
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
    // const list = this.state.list.filter((item) => {
    //     const itemLowercase = item.name.toLowerCase();
    //     const valueLowercase = value.toLowerCase();

    //     if(itemLowercase.startsWith(valueLowercase)) {
    //         return true;
    //     }
    // });

    // this.setState({
    //     // originalList: list,
    //     list: list
    // });
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

    // const listClone = [...this.state.list];

    // if(value !=='') {
    //     listClone.sort();
    // }

    // if(value === 'dsc') {
    //     listClone.reverse();
    // }

    // this.setState({
    //     list: listClone,
    //     sortOrder: value,
    // });
  }

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
  }

  // componentDidUpdate() {

  // }

  render() {
    return (
      <div>
        <div>
          <h1>Nature's Marvels</h1>
          <h3>
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
          <h5>Sort by name</h5>
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
        <Footer />
      </div>
    );
  }
}

export default HealthyThingsPage;
