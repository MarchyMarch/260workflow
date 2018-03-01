var app = new Vue({
	el: '#app',
	data:{
		query: '',
		noCard: true,
		loading: true,
		cards: [],
		cardInfo: {},
		isMinion: false,
		cardText: false,
		search: false,
		errMessage: '',
		cardSetName: '',
		cardSet: [],
	},
	methods:{
		searchCard: function(){
			if (!this.query) {
				alert("A value is required to search");
			}
			else{
				this.loading = true;
				this.noCard = false;
				console.log(this.query);
				var searchURL = 'https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/' +  this.query;
				fetch(searchURL, {
					headers: {
						'X-Mashape-Key': '8M3iNN2Kkwmshki4B4o7YIzR9ukjp10RIKkjsnwhsgk9Xxrfsx'
					},
				}).then(response => {
					//console.log(response.json());
					return response.json();
				}).then(json => {
					this.cards = json;
					if(this.cards.error === undefined){
						this.search = true;
					}
					else{
						this.search = false;
						this.errMessage = this.cards.message;
					}
					//this.cardInfo = this.card[0];
					/*if(this.cardInfo.type === 'Minion'){
						this.isMinion = true;
					}
					if(this.cardInfo.text !== undefined){
						this.cardText = true;
					}*/
					//console.log("cardInfo = " + this.cardInfo.name);
				})
				.catch(err => {
					console.log("caught err: " + err);
					this.errMessage = err;
				})
				this.loading = false;
				console.log("noCard = " + this.noCard);
			}
		},
		randomCard: function(){
			// console.log("this ish is not random");
			var fetchURL = 'https://omgvamp-hearthstone-v1.p.mashape.com/cards';
			fetch(fetchURL, {
				headers:{
					'X-Mashape-Key': '8M3iNN2Kkwmshki4B4o7YIzR9ukjp10RIKkjsnwhsgk9Xxrfsx'
				},
			}).then(response => {
				// console.log(response.json());
				return response.json();
			}).then(json => {
				var setNumber = Math.floor((Math.random() * 12));

				switch(setNumber){
					case 0:
						this.cardSetName = "Classic";
						break;
					case 1:
						this.cardSetName = "Hall of Fame";
						break;
					case 2:
						this.cardSetName = "Journey to Un'Goro";
						break;
					case 3:
						this.cardSetName = "Knights of the Frozen Throne";
						break;
					case 4:
						this.cardSetName = "Kobolds & Catacombs";
						break;
					case 5:
						this.cardSetName = "Mean Streets of Gadgetzan";
						break;
					case 6:
						this.cardSetName = "One Night in Karazhan";
						break;
					case 7:
						this.cardSetName = "Whispers of the Old Gods";
						break;
					case 8:
						this.cardSetName = "The Grand Tournament";
						break;
					case 9:
						this.cardSetName = "The League of Explorers";
						break;
					case 10:
						this.cardSetName = "Goblins vs Gnomes";
						break;
					case 11:
						this.cardSetName = "Blackrock Mountain";
						break;
				}

				// Get the card set from the JSON Object
				this.cardSet = json[this.cardSetName];
				
				// Get Random Card from the set
				var cardNumber = Math.floor((Math.random() * this.cardSet.length));

				this.cards = [];
				this.cards.push(this.cardSet[cardNumber]);

				this.noCard = false;
				this.loading = false;
				this.search = true;
				//console.log(this.cardSet);
				/*this.classic = json["Classic"];
				this.hallOfFame = json["Hall of Fame"];
				this.ungoro = json["Journey to Un'Goro"];
				this.frozenThrone = json["Knights of the Frozen Throne"];
				this.kobolds = json["Kobolds & Catacombs"];
				this.gadgetzan = json["Mean Streets of Gadgetzan"];
				this.*/
			})
		}
	}
})