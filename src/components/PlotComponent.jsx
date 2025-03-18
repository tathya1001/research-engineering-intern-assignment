import './PlotComponent.css';
import Plot from 'react-plotly.js';

const PlotComponent = ({ data, layout }) => {
    return (
        <div className="plot-container">
            <Plot
                data={data}
                layout={{ ...layout, autosize: true }}
                useResizeHandler={true}
                style={{ width: "100%", height: "100%" }}
                config={{ responsive: true }}
            />
        </div>
    );
};

export default PlotComponent;