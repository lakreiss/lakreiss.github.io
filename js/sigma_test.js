
function make_graph() {
  var s = new sigma(
    {
       renderer: {
         container: document.getElementById('sigma-container'),
         type: 'canvas'
       },
       settings: {}
     }
   );

   // fetch('files/queens_family_tree_info.txt')
   // .then(response => response.text())
   // .then(text => console.log(text))

   all_nodes = new Set();

   const logFileText = async file => {
     const response = await fetch(file)
     const text = await response.text()
     console.log(text)

     all_mate_pairs = text.trim().split('\n')
     for (var i = 0; i < all_mate_pairs.length; i++) {
       mate_pair = all_mate_pairs[i].split(',')

       console.log("got to number " + i)
       console.log(mate_pair[0] + mate_pair[1])
       all_nodes.add(mate_pair[0].trim())
       all_nodes.add(mate_pair[1].trim())

       console.log(i + " " + all_mate_pairs[i])
     }

     console.log("all nodes: " + all_nodes)

     var graph = {
      nodes: [
        { id: "n0", label: "A node", x: 0, y: 0, size: 3, color: '#008cc2' },
        { id: "n1", label: "Another node", x: 3, y: 1, size: 2, color: '#008cc2' },
        { id: "n2", label: "And a last one", x: 1, y: 3, size: 1, color: '#E57821' }
      ],
      edges: [
        { id: "e0", source: "n0", target: "n1", color: '#282c34', type:'line', size:0.5 },
        { id: "e1", source: "n1", target: "n2", color: '#282c34', type:'curve', size:1},
        { id: "e2", source: "n2", target: "n0", color: '#FF0000', type:'line', size:2}
      ]
    };

     draw_graph(graph)
   };

   logFileText('files/queens_family_tree_info.txt');


  function draw_graph(graph) {
    s.graph.read(graph);
    s.refresh();
  }


}
