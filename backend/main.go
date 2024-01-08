package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

func main() {
	Routers()
}

func Routers() {
	InitDB()
	defer db.Close()
	log.Println("Starting the HTTP server on port 9080")
	router := mux.NewRouter()
	router.HandleFunc("/inventory",
		GetInventories).Methods("GET")
	router.HandleFunc("/inventory",
		CreateInventory).Methods("POST")
	router.HandleFunc("/inventory/{id}",
		GetInventory).Methods("GET")
	router.HandleFunc("/inventory/{id}",
		UpdateInventory).Methods("PUT")
	router.HandleFunc("/inventory/{id}",
		DeleteInventory).Methods("DELETE")
	http.ListenAndServe(":9080",
		&CORSRouterDecorator{router})
}

/***************************************************/

// Get all inventories
func GetInventories(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var inventories []Inventory

	result, err := db.Query("SELECT id," +
		"judul_buku, jumlah, nama_peminjam, alamat_peminjam, noHp_peminjam, tanggal_pinjam, tanggal_pengembalian, lama_pinjam from peminjamanbuku_mraihannaufalfawwaz")
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()
	for result.Next() {
		var inventory Inventory
		err := result.Scan(&inventory.ID, &inventory.JudulBuku,
			&inventory.Jumlah, &inventory.NamaPeminjam, &inventory.AlamatPeminjam, &inventory.NoHPPeminjam, &inventory.TanggalPinjam, &inventory.TanggalPengembalian, &inventory.LamaPinjam)
		if err != nil {
			panic(err.Error())
		}
		inventories = append(inventories, inventory)
	}
	json.NewEncoder(w).Encode(inventories)
}

// Create inventory
func CreateInventory(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	stmt, err := db.Prepare("INSERT INTO peminjamanbuku_mraihannaufalfawwaz(judul_buku," +
		"jumlah, nama_peminjam, alamat_peminjam, noHp_peminjam, tanggal_pinjam, tanggal_pengembalian, lama_pinjam) VALUES(?,?,?,?,?,?,?,?)")
	if err != nil {
		panic(err.Error())
	}
	body, err := io.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)
	judul_buku := keyVal["judul_buku"]
	jumlah := keyVal["jumlah"]
	nama_peminjam := keyVal["nama_peminjam"]
	alamat_peminjam := keyVal["alamat_peminjam"]
	noHp_peminjam := keyVal["noHp_peminjam"]
	tanggal_pinjam := keyVal["tanggal_pinjam"]
	tanggal_pengembalian := keyVal["tanggal_pengembalian"]
	lama_pinjam := keyVal["lama_pinjam"]
	// print judul_buku
	fmt.Println(judul_buku)
	_, err = stmt.Exec(judul_buku, jumlah, nama_peminjam, alamat_peminjam, noHp_peminjam, tanggal_pinjam, tanggal_pengembalian, lama_pinjam)
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "Buku pinjaman telah ditambahkan!")
}

// Get inventory by ID
func GetInventory(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	result, err := db.Query("SELECT id,"+
		"judul_buku, jumlah, nama_peminjam, alamat_peminjam, noHp_peminjam, tanggal_pinjam, tanggal_pengembalian, lama_pinjam from peminjamanbuku_mraihannaufalfawwaz WHERE id = ?", params["id"])
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()
	var inventory Inventory
	for result.Next() {
		err := result.Scan(&inventory.ID, &inventory.JudulBuku,
			&inventory.Jumlah, &inventory.NamaPeminjam, &inventory.AlamatPeminjam, &inventory.NoHPPeminjam, &inventory.TanggalPinjam, &inventory.TanggalPengembalian, &inventory.LamaPinjam)
		if err != nil {
			panic(err.Error())
		}
	}
	json.NewEncoder(w).Encode(inventory)
}

// Update inventory
func UpdateInventory(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("UPDATE peminjamanbuku_mraihannaufalfawwaz SET judul_buku = ?," +
		"jumlah= ?, nama_peminjam=?, alamat_peminjam=?, noHp_peminjam=?, tanggal_pinjam=?, tanggal_pengembalian=?, lama_pinjam=? WHERE id = ?")

	if err != nil {
		panic(err.Error())
	}
	body, err := io.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)
	judul_buku := keyVal["judul_buku"]
	jumlah := keyVal["jumlah"]
	nama_peminjam := keyVal["nama_peminjam"]
	alamat_peminjam := keyVal["alamat_peminjam"]
	noHp_peminjam := keyVal["noHp_peminjam"]
	tanggal_pinjam := keyVal["tanggal_pinjam"]
	tanggal_pengembalian := keyVal["tanggal_pengembalian"]
	lama_pinjam := keyVal["lama_pinjam"]
	_, err = stmt.Exec(judul_buku, jumlah, nama_peminjam, alamat_peminjam, noHp_peminjam, tanggal_pinjam, tanggal_pengembalian, lama_pinjam, params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "Buku pinjaman dengan ID = %s telah diupdate",
		params["id"])
}

func DeleteInventory(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("DELETE FROM peminjamanbuku_mraihannaufalfawwaz WHERE id = ?")
	if err != nil {
		panic(err.Error())
	}
	_, err = stmt.Exec(params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "Buku pinjaman dengan ID = %s telah dihapus",
		params["id"])
}

type Inventory struct {
	ID                  string `json:"id"`
	JudulBuku           string `json:"judul_buku"`
	Jumlah              string `json:"jumlah"`
	NamaPeminjam        string `json:"nama_peminjam"`
	AlamatPeminjam      string `json:"alamat_peminjam"`
	NoHPPeminjam        string `json:"noHp_peminjam"`
	TanggalPinjam       string `json:"tanggal_pinjam"`
	TanggalPengembalian string `json:"tanggal_pengembalian"`
	LamaPinjam          string `json:"lama_pinjam"`
}

var db *sql.DB
var err error

func InitDB() {
	db, err = sql.Open("mysql",
		"root:@tcp(127.0.0.1:3306)/db_2204055_mraihannaufalfawwaz_uas_pilkomb")
	if err != nil {
		panic(err.Error())
	}
}

/***************************************************/

// CORSRouterDecorator applies CORS headers to a mux.Router
type CORSRouterDecorator struct {
	R *mux.Router
}

func (c *CORSRouterDecorator) ServeHTTP(rw http.ResponseWriter,
	req *http.Request) {
	if origin := req.Header.Get("Origin"); origin != "" {
		rw.Header().Set("Access-Control-Allow-Origin", origin)
		rw.Header().Set("Access-Control-Allow-Methods",
			"POST, GET, OPTIONS, PUT, DELETE")
		rw.Header().Set("Access-Control-Allow-Headers",
			"Accept, Accept-Language,"+
				" Content-Type, YourOwnHeader")
	}
	// Stop here if its Preflighted OPTIONS request
	if req.Method == "OPTIONS" {
		return
	}

	c.R.ServeHTTP(rw, req)
}
