import React, { Component } from "react";
import InventoryService from "../services/InventoryService";

class CreateInventoryComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      judul_buku: "",
      jumlah: "",
      nama_peminjam: "",
      alamat_peminjam: "",
      noHp_peminjam: "",
      tanggal_pinjam: "",
      tanggal_pengembalian: "",
      lama_pinjam: "",
      showNotification: false,
    };

    this.changeJudulBuku = this.changeJudulBuku.bind(this);
    this.changeJumlah = this.changeJumlah.bind(this);
    this.changeNamaPeminjam = this.changeNamaPeminjam.bind(this);
    this.changeAlamatPeminjam = this.changeAlamatPeminjam.bind(this);
    this.changeNoHPPeminjam = this.changeNoHPPeminjam.bind(this);
    this.changeTanggalPinjam = this.changeTanggalPinjam.bind(this);
    this.changeTanggalPengembalian = this.changeTanggalPengembalian.bind(this);
    this.changeLamaPinjam = this.changeLamaPinjam.bind(this);
    this.saveOrUpdateInventory = this.saveOrUpdateInventory.bind(this);
  }

  componentDidMount() {
    if (this.state.id === "add") {
      return;
    } else {
      InventoryService.getInventoryById(this.state.id).then((res) => {
        let inventory = res.data;
        this.setState({
          judul_buku: inventory.judul_buku,
          jumlah: inventory.jumlah,
          nama_peminjam: inventory.nama_peminjam,
          alamat_peminjam: inventory.alamat_peminjam,
          noHp_peminjam: inventory.noHp_peminjam,
          tanggal_pinjam: inventory.tanggal_pinjam,
          tanggal_pengembalian: inventory.tanggal_pengembalian,
          lama_pinjam: inventory.lama_pinjam,
        });
      });
    }
  }

  saveOrUpdateInventory = (e) => {
    e.preventDefault();
    if (
      this.state.judul_buku.trim() === "" ||
      this.state.jumlah.trim() === "" ||
      this.state.nama_peminjam.trim() === "" ||
      this.state.alamat_peminjam.trim() === "" ||
      this.state.noHp_peminjam.trim() === "" ||
      this.state.tanggal_pinjam.trim() === "" ||
      this.state.tanggal_pengembalian.trim() === "" ||
      this.state.lama_pinjam.trim() === ""
    ) {
      alert("Mohon isi semua kolom.");
      return;
    }

    let inventory = {
      judul_buku: this.state.judul_buku,
      jumlah: this.state.jumlah,
      nama_peminjam: this.state.nama_peminjam,
      alamat_peminjam: this.state.alamat_peminjam,
      noHp_peminjam: this.state.noHp_peminjam,
      tanggal_pinjam: this.state.tanggal_pinjam,
      tanggal_pengembalian: this.state.tanggal_pengembalian,
      lama_pinjam: this.state.lama_pinjam,
    };

    if (this.state.id === "add") {
      InventoryService.createInventory(inventory).then((res) => {
        this.setState({ showNotification: true }, () => {
          setTimeout(() => {
            this.setState({ showNotification: false });
            this.props.history.push("/inventory");
          }, 2000);
        });
      });
    } else {
      InventoryService.updateInventory(inventory, this.state.id).then((res) => {
        this.props.history.push("/inventory");
      });
    }
  };

  changeJudulBuku = (event) => {
    this.setState({ judul_buku: event.target.value });
  };

  changeJumlah = (event) => {
    const value = event.target.value;

    if (/^\d+$/.test(value) && value >= 1 && value <= 10) {
      this.setState({ jumlah: value });
    } else {
      console.error(
        "Jumlah buku tidak valid. Pastikan jumlah di antara 1 dan 10."
      );
    }
  };

  changeNamaPeminjam = (event) => {
    this.setState({ nama_peminjam: event.target.value });
  };

  changeAlamatPeminjam = (event) => {
    this.setState({ alamat_peminjam: event.target.value });
  };

  changeNoHPPeminjam = (event) => {
    const value = event.target.value;

    if (/^\d+$/.test(value) || value === "") {
      this.setState({ noHp_peminjam: value });
    } else {
      console.error("Nomor tidak valid. Mohon isi dengan angka.");
    }
  };

  changeTanggalPinjam = (event) => {
    this.setState({ tanggal_pinjam: event.target.value });
  };

  changeTanggalPengembalian = (event) => {
    this.setState({ tanggal_pengembalian: event.target.value });
  };

  changeLamaPinjam = (event) => {
    this.setState({ lama_pinjam: event.target.value });
  };

  cancel() {
    this.props.history.push("/inventory");
  }

  getTitle() {
    if (this.state.id === "add") {
      return <h3 className="text-center">Pinjam Buku</h3>;
    } else {
      return <h3 className="text-center">Update Pinjaman</h3>;
    }
  }

  render() {
    return (
      <div>
        <div
          className={`overlay ${this.state.showNotification ? "show" : ""}`}
        ></div>
        <div className="container mt-5">
          <div className="row">
            <div className="card col-lg-6 offset-lg-3 mb-10 pt-4">
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Judul Buku: </label>
                    <input
                      name="judul"
                      className="form-control"
                      value={this.state.judul_buku}
                      onChange={this.changeJudulBuku}
                    />
                  </div>
                  <div className="form-group">
                    <label> Jumlah: </label>
                    <input
                      type="number"
                      inputMode="numeric"
                      name="jumlah"
                      className="form-control"
                      value={this.state.jumlah}
                      onChange={this.changeJumlah}
                    />
                  </div>
                  <div className="form-group">
                    <label> Nama Peminjam: </label>
                    <input
                      name="nama_peminjam"
                      className="form-control"
                      value={this.state.nama_peminjam}
                      onChange={this.changeNamaPeminjam}
                    />
                  </div>
                  <div className="form-group">
                    <label> Alamat: </label>
                    <input
                      name="alamat_peminjam"
                      className="form-control"
                      value={this.state.alamat_peminjam}
                      onChange={this.changeAlamatPeminjam}
                    />
                  </div>
                  <div className="form-group">
                    <label> Nomor HP: </label>
                    <input
                      inputMode="numeric"
                      name="noHp_peminjam"
                      className="form-control"
                      value={this.state.noHp_peminjam}
                      onChange={this.changeNoHPPeminjam}
                    />
                  </div>
                  <div className="form-group d-flex flex-column flex-sm-row gap-4">
                    <div className="flex-fill">
                      <label> Tanggal Pinjam: </label>
                      <input
                        type="date"
                        name="tanggal_pinjam"
                        className="form-control"
                        value={this.state.tanggal_pinjam}
                        onChange={this.changeTanggalPinjam}
                      />
                    </div>
                    <div className="flex-fill">
                      <label> Tanggal Pengembalian: </label>
                      <input
                        type="date"
                        name="tanggal_pengembalian"
                        className="form-control"
                        value={this.state.tanggal_pengembalian}
                        onChange={this.changeTanggalPengembalian}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label> Lama Pinjam: </label>
                    <input
                      name="lama_pinjam"
                      className="form-control"
                      value={this.state.lama_pinjam}
                      onChange={this.changeLamaPinjam}
                    />
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={this.saveOrUpdateInventory}
                  >
                    Simpan
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "12px" }}
                  >
                    Batal
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {this.state.showNotification && (
          <div className="notification d-flex flex-column align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              fill="#28A745"
              class="bi bi-check-circle"
              viewBox="0 0 16 16"
              className="mb-3"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
            </svg>
            <h5 className="mb-0">Data berhasil ditambahkan!</h5>
          </div>
        )}
      </div>
    );
  }
}

export default CreateInventoryComponent;
