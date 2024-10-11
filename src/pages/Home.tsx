import React, { useState, useEffect } from 'react';
import { IonContent, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import './Home.css';

const CuacaApp: React.FC = () => {
  const [namaKota, setNamaKota] = useState<string>('Manado');
  const [dataCuaca, setDataCuaca] = useState<any>(null);

  const apiKunci = 'ad73fbd4d6da5e2cbf23761a1acd976a';

  const ambilCuaca = async () => {
    if (!namaKota) return;

    try {
      const respon = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${namaKota}&units=metric&appid=${apiKunci}&lang=id`);
      const hasil = await respon.json();
      setDataCuaca(hasil);
    } catch (kesalahan) {
      console.error('Gagal mengambil data cuaca:', kesalahan);
    }
  };

  useEffect(() => {
    ambilCuaca();
  }, [namaKota]);

  return (
    <IonContent>
      <div>
        {dataCuaca && (
          <IonCard className="kartu-cuaca">
            <div className="bagian-input">
              <div className="kotak-cari">
                <IonIcon icon={searchOutline} className="ikon-cari" />
                <IonInput value={namaKota} placeholder="Cari kota" onIonChange={(e) => setNamaKota(e.detail.value!)} clearInput class="input-kota" />
              </div>
            </div>
            <IonCardHeader className="header-kota">
              <h3>Cuaca di {namaKota}</h3>
            </IonCardHeader>
            <IonCardContent>
              <div className="ikon-cuaca">
                <h1 className="suhu">{Math.round(dataCuaca.main.temp)}°C</h1>
                <img src={`https://openweathermap.org/img/wn/${dataCuaca.weather[0].icon}@4x.png`} alt="Ikon Cuaca" />
              </div>
              <p className="deskripsi">{dataCuaca.weather[0].description}</p>
              <div className="detail-cuaca">
                <div className="kotak-detail">
                  <p>Kecepatan Angin</p>
                  <p>{dataCuaca.wind.speed} m/s</p>
                </div>
                <div className="kotak-detail">
                  <p>Kelembaban</p>
                  <p>{dataCuaca.main.humidity}%</p>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        )}
      </div>
    </IonContent>
  );
};

export default CuacaApp;
