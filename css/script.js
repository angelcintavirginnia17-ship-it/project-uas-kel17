// JavaScript untuk Baby & Mother Needs Store

// Fungsi untuk mengelola keranjang belanja menggunakan localStorage
let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
let total = keranjang.reduce((sum, item) => sum + item.harga, 0);

// Fungsi untuk menambahkan produk ke keranjang
function tambahKeKeranjang(nama, harga) {
    keranjang.push({ nama, harga });
    total += harga;
    localStorage.setItem('keranjang', JSON.stringify(keranjang));
    updateJumlahItem();
    alert(nama + " dimasukkan ke keranjang!");
}

// Fungsi untuk update jumlah item di ikon keranjang
function updateJumlahItem() {
    const jumlahItemEl = document.getElementById('jumlah-item');
    if (jumlahItemEl) {
        jumlahItemEl.innerText = keranjang.length;
    }
}

// Fungsi untuk membuka modal keranjang (untuk halaman lain)
function bukaKeranjang() {
    const modal = document.getElementById('modal-keranjang');
    if (modal) {
        modal.style.display = "block";
        updateTampilanKeranjang();
    }
}

// Fungsi untuk menutup modal keranjang
function tutupKeranjang() {
    const modal = document.getElementById('modal-keranjang');
    if (modal) {
        modal.style.display = "none";
    }
}

// Fungsi untuk update tampilan isi keranjang (modal)
function updateTampilanKeranjang() {
    const list = document.getElementById('isi-keranjang');
    const totalHargaEl = document.getElementById('total-harga');
    if (list && totalHargaEl) {
        list.innerHTML = "";
        if (keranjang.length === 0) {
            list.innerHTML = '<p style="color: #888;">Keranjang kosong.</p>';
        } else {
            keranjang.forEach((item, index) => {
                list.innerHTML += `<p>${item.nama} - Rp ${item.harga.toLocaleString()} <button onclick="hapusDariKeranjang(${index})" style="background:red; color:white; border:none; padding:2px 5px; cursor:pointer;">Hapus</button></p>`;
            });
        }
        totalHargaEl.innerText = "Rp " + total.toLocaleString();
    }
}

// Fungsi untuk update tampilan keranjang lengkap (halaman keranjang)
function updateTampilanKeranjangLengkap() {
    const list = document.getElementById('isi-keranjang-lengkap');
    const totalHargaEl = document.getElementById('total-harga');
    if (list && totalHargaEl) {
        list.innerHTML = "";
        if (keranjang.length === 0) {
            list.innerHTML = '<p style="text-align: center; color: #888;">Keranjang kosong.</p>';
        } else {
            keranjang.forEach((item, index) => {
                list.innerHTML += `<div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #eee; margin-bottom: 10px; background: #f9f9f9; border-radius: 5px;"><div><strong>${item.nama}</strong> - Rp ${item.harga.toLocaleString()}</div><button onclick="hapusDariKeranjang(${index})" style="background:red; color:white; border:none; padding:5px 10px; cursor:pointer; border-radius:3px;">Hapus</button></div>`;
            });
        }
        totalHargaEl.innerText = "Rp " + total.toLocaleString();
    }
}

// Fungsi untuk menghapus item dari keranjang
function hapusDariKeranjang(index) {
    total -= keranjang[index].harga;
    keranjang.splice(index, 1);
    localStorage.setItem('keranjang', JSON.stringify(keranjang));
    updateJumlahItem();
    updateTampilanKeranjang();
    updateTampilanKeranjangLengkap();
}

// Fungsi untuk checkout
function checkout() {
    if (keranjang.length === 0) {
        alert("Keranjang Anda masih kosong!");
        return;
    }
    const alamat = prompt("Masukkan alamat pengiriman:");
    if (!alamat) {
        alert("Alamat diperlukan untuk checkout.");
        return;
    }
    alert("Terima kasih! Pesanan Anda akan dikirim ke: " + alamat + "\nTotal belanja: Rp " + total.toLocaleString());
    keranjang = [];
    total = 0;
    localStorage.removeItem('keranjang');
    updateJumlahItem();
    updateTampilanKeranjang();
    updateTampilanKeranjangLengkap();
}

// Event listener untuk tombol beli
document.addEventListener('DOMContentLoaded', function() {
    const tombolBeli = document.querySelectorAll('.product button');
    tombolBeli.forEach((tombol) => {
        tombol.addEventListener('click', function() {
            const productDiv = tombol.parentElement;
            const namaProduk = productDiv.querySelector('h3').innerText;
            const hargaTeks = productDiv.querySelector('.price').innerText;
            const hargaAngka = parseInt(hargaTeks.replace(/[^0-9]/g, ''));
            tambahKeKeranjang(namaProduk, hargaAngka);
        });
    });

    // Update jumlah item saat halaman load
    updateJumlahItem();
    // Update tampilan keranjang lengkap jika di halaman keranjang
    updateTampilanKeranjangLengkap();
});

// Dark Mode Toggle
document.addEventListener("DOMContentLoaded", function () {
    const btnDarkMode = document.getElementById("btnDarkMode");

    btnDarkMode.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");

        // Ubah teks tombol sesuai mode
        if (document.body.classList.contains("dark-mode")) {
            btnDarkMode.innerHTML = '<i class="bi bi-sun"></i> Mode Terang';
        } else {
            btnDarkMode.innerHTML = '<i class="bi bi-moon"></i> Mode Gelap';
        }
    });
});
