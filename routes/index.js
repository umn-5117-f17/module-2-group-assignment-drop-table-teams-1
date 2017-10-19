var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
projectSchema = [{
  _id: "test",
  createDate: "today",
  lastEditDate:"just now",
  user_Id:"id",
  collaborator_Id: [ "id_1","id_2"],
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dapibus aliquet sem luctus posuere. Duis finibus scelerisque volutpat. Duis rhoncus posuere iaculis. Nam vel nisi eget nulla ultricies imperdiet. Integer id iaculis massa, nec maximus lectus. In at tellus est. Vestibulum fermentum purus vel diam bibendum venenatis. Duis ipsum leo, porttitor id lacinia vel, volutpat sed velit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce sem neque, faucibus nec luctus eu, venenatis at nisl.",
  contentType:"?",
  size:"big",
  pdfProject: "../data/upload-me.jpg",
  additionalPdf:"",
  pdfName:"",
  title:"My first project",
  subject:"HCI",
  tags: ["junk", "stuff", "turtles"
  ],
  rating: [ 5, 1, 3
  ],
  comments: ["great","cool", "neat"
  ]
},{
  _id: "test",
  createDate: "today",
  lastEditDate:"just now",
  user_Id:"id",
  collaborator_Id: [ "id_1","id_2"],
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dapibus aliquet sem luctus posuere. Duis finibus scelerisque volutpat. Duis rhoncus posuere iaculis. Nam vel nisi eget nulla ultricies imperdiet. Integer id iaculis massa, nec maximus lectus. In at tellus est. Vestibulum fermentum purus vel diam bibendum venenatis. Duis ipsum leo, porttitor id lacinia vel, volutpat sed velit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce sem neque, faucibus nec luctus eu, venenatis at nisl.",
  contentType:"?",
  size:"big",
  pdfProject: "../data/upload-me.jpg",
  additionalPdf:"",
  pdfName:"",
  title:"My first project",
  subject:"HCI",
  tags: ["junk", "stuff", "turtles"
  ],
  rating: [ 5, 1, 3
  ],
  comments: ["great","cool", "neat"
  ]
},
{
  _id: "test",
  createDate: "today",
  lastEditDate:"just now",
  user_Id:"id",
  collaborator_Id: [ "id_1","id_2"],
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dapibus aliquet sem luctus posuere. Duis finibus scelerisque volutpat. Duis rhoncus posuere iaculis. Nam vel nisi eget nulla ultricies imperdiet. Integer id iaculis massa, nec maximus lectus. In at tellus est. Vestibulum fermentum purus vel diam bibendum venenatis. Duis ipsum leo, porttitor id lacinia vel, volutpat sed velit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce sem neque, faucibus nec luctus eu, venenatis at nisl.",
  contentType:"?",
  size:"big",
  pdfProject: "../data/upload-me.jpg",
  additionalPdf:"",
  pdfName:"",
  title:"My first project",
  subject:"HCI",
  tags: ["junk", "stuff", "turtles"
  ],
  rating: [ 5, 1, 3
  ],
  comments: ["great","cool", "neat"
  ]
},
{
  _id: "test",
  createDate: "today",
  lastEditDate:"just now",
  user_Id:"id",
  collaborator_Id: [ "id_1","id_2"],
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dapibus aliquet sem luctus posuere. Duis finibus scelerisque volutpat. Duis rhoncus posuere iaculis. Nam vel nisi eget nulla ultricies imperdiet. Integer id iaculis massa, nec maximus lectus. In at tellus est. Vestibulum fermentum purus vel diam bibendum venenatis. Duis ipsum leo, porttitor id lacinia vel, volutpat sed velit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce sem neque, faucibus nec luctus eu, venenatis at nisl.",
  contentType:"?",
  size:"big",
  pdfProject: "../data/upload-me.jpg",
  additionalPdf:"",
  pdfName:"",
  title:"My first project",
  subject:"HCI",
  tags: ["junk", "stuff", "turtles"
  ],
  rating: [ 5, 1, 3
  ],
  comments: ["great","cool", "neat"
  ]
}];
  res.render('index', {
    projects: projectSchema
  });
});

module.exports = router;
