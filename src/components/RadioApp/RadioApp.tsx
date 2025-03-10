import React, {useState} from 'react';
import RadioPlayer from '../RadioPlayer/RadioPlayer.tsx';
import StationSelector from '../StationSelector/StationSelector.tsx';
import './RadioApp.css';
import {ThemeProvider} from "../../contexts/ThemeContext.tsx";
import ThemeToggle from "../ThemeToggle/ThemeToggle.tsx";
import ServerPicker from "../ServerPicker/ServerPicker.tsx";
import {paths} from "../../services/path.service.ts";
import StationList from "../StationList/StationList.tsx";

const RadioApp: React.FC = () => {
    const [selectedStation, setSelectedStation] = useState<RadioStation | null>(null)
    const [stations, setStations] = useState<RadioStation[]>([])
    const [selectedServer, setSelectedServer] = useState<Server | null>(null)

    const onNewServerSelected = (server: Server)=> {
        paths.setServer(server.name)
        setSelectedServer(server)
    }

    return (
        <ThemeProvider>
            {!selectedServer ?  <ServerPicker onServerSelected={(server)=>onNewServerSelected(server)}></ServerPicker>:
                <>
        <div className="radio-app">
            <ThemeToggle/>
            <header className="app-header">
                <h1>Web Radio Explorer</h1>
                <p>Discover and listen to radio stations from around the world</p>
            </header>
            <RadioPlayer station={selectedStation}/>
            <StationList
                stations={stations}
                onStationSelect={(station)=>setSelectedStation(station)}
            />
            <StationSelector
                stationsPerPage={20}
                stationCount={selectedServer.stations}
                onStationsUpdate={(stations)=>setStations(stations)}
            />
        </div>
                </>
            }
                </ThemeProvider>
    );
};

export default RadioApp;