import React, { Component } from "react";
import InventoryService from "../services/InventoryService";
import { InputGroup, FormControl } from "react-bootstrap";

class ListInventoryComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inventories: [],
      deleteInventoryId: null,
      searchInput: "",
    };

    this.addInventory = this.addInventory.bind(this);
    this.editInventory = this.editInventory.bind(this);
    this.deleteInventory = this.deleteInventory.bind(this);
    this.showDeleteConfirmation = this.showDeleteConfirmation.bind(this);
    this.hideDeleteConfirmation = this.hideDeleteConfirmation.bind(this);
    this.confirmDeleteInventory = this.confirmDeleteInventory.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  deleteInventory(id) {
    this.setState({ deleteInventoryId: id });
    this.showDeleteConfirmation();
  }

  confirmDeleteInventory() {
    const id = this.state.deleteInventoryId;
    InventoryService.deleteInventory(id).then((res) => {
      this.setState({
        inventories: this.state.inventories.filter(
          (inventory) => inventory.id !== id
        ),
        deleteInventoryId: null,
      });
      this.hideDeleteConfirmation();
    });
  }

  showDeleteConfirmation() {
    this.disableBodyScroll();
    document.getElementById("delete-confirmation").style.display = "flex";
  }

  hideDeleteConfirmation() {
    document.getElementById("delete-confirmation").style.display = "none";
    this.enableBodyScroll();
  }

  disableBodyScroll() {
    document.body.style.overflow = "hidden";
  }

  enableBodyScroll() {
    document.body.style.overflow = "auto";
  }

  viewInventory(id) {
    this.props.history.push(`/view-inventory/${id}`);
  }

  editInventory(id) {
    this.props.history.push(`/add-inventory/${id}`);
  }

  handleSearchChange(event) {
    this.setState({ searchInput: event.target.value });
  }

  componentDidMount() {
    InventoryService.getInventories().then((res) => {
      if (res.data == null) {
        this.props.history.push("/add-inventory/add");
      }
      this.setState({ inventories: res.data });
    });
  }

  addInventory() {
    this.props.history.push("/add-inventory/add");
  }

  render() {
    const filteredInventories = this.state.inventories.filter((inventory) =>
      inventory.judul_buku
        .toLowerCase()
        .includes(this.state.searchInput.toLowerCase())
    );

    return (
      <div className="mx-2 mx-lg-4">
        <h2 className="text-center mt-5 mb-4">Daftar Pinjaman Buku</h2>
        <div className="d-flex flex-column flex-sm-row justify-content-between mx-0 gap-4">
          <div>
            <button
              style={{
                borderRadius: "0.5rem",
              }}
              className="btn btn-success d-flex d-sm-inline-flex align-items-center gap-2"
              onClick={this.addInventory}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-plus-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
              Tambah Buku Pinjaman
            </button>
          </div>

          <div>
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Cari judul buku"
                style={{
                  borderRadius: "0.5rem 0rem 0rem 0.5rem",
                  borderRight: "0px",
                }}
                className="d-inline-flex align-items-center w-fit"
                value={this.state.searchInput}
                onChange={this.handleSearchChange}
              />
              <span
                style={{
                  borderRadius: "0rem 0.5rem 0.5rem 0rem",
                  borderLeft: "0px",
                  backgroundColor: "white",
                }}
                class="input-group-text"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </span>
            </InputGroup>
          </div>
        </div>
        <br />
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="text-center">
              <tr>
                <th className="align-middle">Judul</th>
                <th className="align-middle">Jumlah</th>
                <th className="align-middle">Nama Peminjam</th>
                <th className="align-middle">Alamat</th>
                <th className="align-middle">Nomor HP</th>
                <th className="align-middle">Tanggal Pinjam</th>
                <th className="align-middle">Tanggal Pengembalian</th>
                <th className="align-middle">Lama Pinjam</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredInventories.map((inventory) => (
                <tr key={inventory.id}>
                  <td>{inventory.judul_buku}</td>
                  <td>{inventory.jumlah}</td>
                  <td>{inventory.nama_peminjam}</td>
                  <td>{inventory.alamat_peminjam}</td>
                  <td>{inventory.noHp_peminjam}</td>
                  <td>{inventory.tanggal_pinjam}</td>
                  <td>{inventory.tanggal_pengembalian}</td>
                  <td>{inventory.lama_pinjam}</td>
                  <td className="align-self-stretch">
                    <div className="d-flex column align-middle">
                      <button
                        style={{
                          padding: "0.5rem",
                          borderRadius: "0.5rem 0 0 0.5rem",
                        }}
                        onClick={() => this.editInventory(inventory.id)}
                        className="btn bg-warning"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-pencil"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                        </svg>
                      </button>

                      <button
                        style={{
                          padding: "0.5rem",
                          borderRadius: "0",
                        }}
                        onClick={() => this.deleteInventory(inventory.id)}
                        className="btn btn-danger"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash3"
                          viewBox="0 0 16 16"
                        >
                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                        </svg>
                      </button>

                      <button
                        style={{
                          padding: "0.5rem",
                          borderRadius: "0rem 0.5rem 0.5rem 0",
                        }}
                        onClick={() => this.viewInventory(inventory.id)}
                        className="btn btn-primary"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-info-circle"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                          <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897+.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          id="delete-confirmation"
          className="confirmation-modal"
          onClick={this.hideDeleteConfirmation}
        >
          <div className="confirmation-content d-flex flex-column align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              fill="#DC3545"
              class="bi bi-exclamation-circle"
              viewBox="0 0 16 16"
              className="mb-3"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
            </svg>
            <h5>Anda yakin ingin menghapus data ini?</h5>
            <p>Anda tidak dapat mengembalikan tindakan ini</p>
            <div className="d-flex flex-row gap-3">
              <button
                className="btn btn-outline-secondary"
                onClick={this.hideDeleteConfirmation}
              >
                Kembali
              </button>
              <button
                className="btn btn-danger"
                onClick={this.confirmDeleteInventory}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListInventoryComponent;
