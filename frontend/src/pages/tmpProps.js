exports.tmpProps = [
  {
    _id: '1',
    seller: { email: 'filler@gmail.com', isRealtor: true },
    imgPaths: ['/tmp/1.jpg', '/tmp/2.jpg', '/tmp/3.jpg'],
    zipCode: 'X1X 1Y1',
    city: 'Calgary',
    street: '111 Testing Ave',
    quadrant: 'NW',
    criteria: {
      quad: 'NW',
      bathrooms: '3+',
      bedrooms: '4',
      type: 'Multi Family',
      furnished: true,
      price: 500000
    },
    createdAt: new Date()
  },
  {
    _id: '2',
    seller: { email: 'testing@gmail.com', isRealtor: true },
    imgPaths: ['/tmp/4.jpg', '/tmp/5.jpg'],
    zipCode: 'A1A 2B2',
    city: 'Edmonton',
    street: '222 Testing Ave',
    quadrant: 'SW',
    criteria: {
      quad: 'SW',
      bathrooms: '2',
      bedrooms: '3',
      type: 'Residential',
      furnished: false,
      price: 200000
    },
    createdAt: new Date()
  },
  {
    _id: '3',
    seller: { email: 'NotARealtor@gmail.com', isRealtor: false },
    imgPaths: ['/tmp/6.jpg'],
    zipCode: 'X1X 1Y1',
    city: 'Calgary',
    street: '1234 Sesame St',
    quadrant: 'NW',
    criteria: {
      quad: 'NW',
      bathrooms: '2+',
      bedrooms: '3',
      type: 'Condo/Strata',
      furnished: true,
      price: 400000
    },
    createdAt: new Date()
  },
  {
    _id: '4',
    seller: { email: 'Micro@outlook.com', isRealtor: false },
    imgPaths: ['/tmp/7.jpg'],
    zipCode: 'X1X 1Y1',
    city: 'Calgary',
    street: '123 Test Dr',
    quadrant: 'NW',
    criteria: {
      quad: 'NW',
      bathrooms: '3+',
      bedrooms: '4',
      type: 'Multi Family',
      furnished: true,
      price: 500000
    },
    createdAt: new Date()
  },
  {
    _id: '5',
    seller: { email: 'filler@gmail.com', isRealtor: true },
    imgPaths: ['/tmp/8.jpg'],
    zipCode: 'X1X 1Y1',
    city: 'Calgary',
    street: '111 Testing Ave',
    quadrant: 'NW',
    criteria: {
      quad: 'NW',
      bathrooms: '3+',
      bedrooms: '4',
      type: 'Multi Family',
      furnished: true,
      price: 500000
    },
    createdAt: new Date()
  }
]
