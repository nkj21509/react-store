import React from "react";
import axios from "commons/axios"
import {toast} from "react-toastify"

class Addinventory extends React.Component {
  state = {
    name: "",
    price: 0,
    tags: "",
    image: "",
    status: "available",
  };

  handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value,
    });
  };

  submit = (e) => {
      e.preventDefault();
      const product = {...this.state};
      axios.post('/products', product).then(res => {
          console.log(res.data)
          this.props.close(product);
          toast.success('Add Success')
      }).catch();
  };

  render() {
    const { name, price, tags, image, status } = this.state;
    return (
      <div className="inventory">
        <p className="title has-text-centered">Inventory</p>
        <form onSubmit={this.submit}>
          <div className="field">
            <div className="control">
              <label className="label">Name</label>
              <textarea
                className="textarea"
                name="name"
                value={name}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">Price</label>
              <input
                type="number"
                className="input"
                name="price"
                value={price}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">Tags</label>
              <input
                type="text"
                className="input"
                name="tags"
                value={tags}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">Image</label>
              <input
                type="text"
                className="input"
                name="image"
                value={image}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">Status</label>
              <div className="select is-fullwidth">
                <select
                  name="status"
                  value={status}
                  onChange={this.handleChange}
                >
                  <option>available</option>
                  <option>unavailable</option>
                </select>
              </div>
            </div>
          </div>
          <br />
          <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <button type="submit" className="button is-link">Submit</button>
            </div>
            <div className="control">
              <button className="button" type="button" onClick={() => this.props.close()}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Addinventory;
