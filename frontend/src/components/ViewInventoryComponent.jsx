import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import InventoryService from "../services/InventoryService";

class ViewInventoryComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      inventory: {},
      deleteInventoryId: null,
    };

    this.disableBodyScroll = this.disableBodyScroll.bind(this);
    this.enableBodyScroll = this.enableBodyScroll.bind(this);
    this.deleteInventory = this.deleteInventory.bind(this);
    this.confirmDeleteInventory = this.confirmDeleteInventory.bind(this);
    this.showDeleteConfirmation = this.showDeleteConfirmation.bind(this);
    this.hideDeleteConfirmation = this.hideDeleteConfirmation.bind(this);
  }

  componentDidMount() {
    InventoryService.getInventoryById(this.state.id).then((res) => {
      this.setState({ inventory: res.data });
    });
  }

  deleteInventory(id) {
    this.setState({ deleteInventoryId: id });
    this.showDeleteConfirmation();
  }

  confirmDeleteInventory() {
    const id = this.state.deleteInventoryId;
    InventoryService.deleteInventory(id).then(() => {
      this.props.history.push("/inventory");
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

  render() {
    return (
      <div className="mt-4 mt-md-12">
        <div className="card col-lg-6 offset-lg-3 mb-10 pt-4">
          <div className="d-flex justify-content-between align-items-stretch">
            <div className="d-flex ml-3">
              <button
                className="btn btn-outline-secondary d-flex d-sm-inline-flex align-items-center gap-2 pl-2"
                onClick={() => this.props.history.push("/inventory")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-arrow-left-short"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
                  />
                </svg>
                Kembali
              </button>
            </div>
            <div className="d-flex mr-3">
              <button
                style={{
                  borderRadius: "0.3rem",
                }}
                onClick={() => this.deleteInventory(this.state.inventory.id)}
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
            </div>
          </div>
          <h3 className="text-center mt-4">Detail Buku Pinjaman</h3>
          <div className="card-body mt-2">
            <div className="row mb-3 mb-sm-4">
              <label className="col-12 col-sm-4 mb-0 font-bold">
                {" "}
                Judul Buku:{" "}
              </label>
              <div className="col-12 col-sm-8">
                {this.state.inventory.judul_buku}
              </div>
            </div>
            <div className="row mb-3 mb-sm-4">
              <label className="col-12 col-sm-4 mb-0 font-bold">
                {" "}
                Jumlah:{" "}
              </label>
              <div className="col-12 col-sm-8">
                {this.state.inventory.jumlah}
              </div>
            </div>
            <div className="row mb-3 mb-sm-4">
              <label className="col-12 col-sm-4 mb-0 font-bold">
                {" "}
                Nama Peminjam:{" "}
              </label>
              <div className="col-12 col-sm-8">
                {this.state.inventory.nama_peminjam}
              </div>
            </div>
            <div className="row mb-3 mb-sm-4">
              <label className="col-12 col-sm-4 mb-0 font-bold">
                {" "}
                Alamat:{" "}
              </label>
              <div className="col-12 col-sm-8">
                {this.state.inventory.alamat_peminjam}
              </div>
            </div>
            <div className="row mb-3 mb-sm-4">
              <label className="col-12 col-sm-4 mb-0 font-bold"> No HP: </label>
              <div className="col-12 col-sm-8">
                {this.state.inventory.noHp_peminjam}
              </div>
            </div>
            <div className="row mb-3 mb-sm-4">
              <label className="col-12 col-sm-4 mb-0 font-bold">
                {" "}
                Tanggal Pinjam:{" "}
              </label>
              <div className="col-12 col-sm-8">
                {this.state.inventory.tanggal_pinjam}
              </div>
            </div>
            <div className="row mb-3 mb-sm-4">
              <label className="col-12 col-sm-4 mb-0 font-bold">
                {" "}
                Tanggal Pengembalian:{" "}
              </label>
              <div className="col-12 col-sm-8">
                {this.state.inventory.tanggal_pengembalian}
              </div>
            </div>
            <div className="row mb-3 mb-sm-4">
              <label className="col-12 col-sm-4 mb-0 font-bold">
                {" "}
                Lama Pinjam:{" "}
              </label>
              <div className="col-12 col-sm-8">
                {this.state.inventory.lama_pinjam}
              </div>
            </div>
          </div>
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

export default withRouter(ViewInventoryComponent);
