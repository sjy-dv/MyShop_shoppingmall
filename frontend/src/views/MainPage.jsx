import { Component } from 'react';
import Jumbotron from '../components/Jumbotron';
import C_product from '../components/C_product';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: '',
    };
  }
  componentDidMount() {
    this.fromBackend()
      .then((res) => this.setState({ product: res }))
      .catch((err) => console.log(err));
  }
  fromBackend = async () => {
    const response = await fetch('http://localhost:8081/api/product/mainlist');
    const data = await response.json();
    console.log(data);
    return data;
  };

  render() {
    return (
      <>
        <Jumbotron></Jumbotron>
        <div className="container" style={{ textAlign: 'center' }}>
          <p>&lt;&lt;&lt;&lt;&lt;&lt; MD choice &gt;&gt;&gt;&gt;&gt;&gt;</p>
        </div>
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row">
              {this.state.product
                ? this.state.product.map((k) => {
                    return (
                      <C_product
                        key={k.p_idx}
                        idx={k.p_idx}
                        img={k.p_img}
                        name={k.p_name}
                        content={k.p_content}
                        price={k.p_price}
                      />
                    );
                  })
                : 'DB ERROR !! 조금만 기다려주세요.'}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MainPage;
