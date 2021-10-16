/* eslint-disable no-unused-vars */
module.exports = {
	name: 'story',
	description: 'Play our choose your own adventure story!',
	execute(msg, args) {
		const client = msg.client;
		const Discord = require('discord.js');
		const mysql = require('mysql');
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'latehome4',
			database:'discord',
			charset : 'utf8mb4',
		});
            connection.query('select * from profiles where name = ?', [msg.member.user.username], async function (error, results, fields) {
					if (results[0] == undefined || results[0].missionnumber == 1) {
						const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('The Adventures of Anthony Paul: Day of the Dead')
							.addFields(
								{ name: '7:00pm, Thursday November 1 2th', value: 'You look outside through the cracked window. The land is barren, the dark blanket of night swept in less than an hour ago. Tiny fragments of snow float down from the dark gray masses above. You look closely at the land and see a hole that a 2 feet by 6 feet, a grave. You turn around quickly, the cold metal keys in your hand and swiftly walk towards the door. After passing the door, you attempt to lock the door to your bedroom, but right as you do, you hear an eerie noise on the top of the stairs. You contemplate what the noise is, then decide to go to sleep and think that the noise is nothing.', inline: false },
								{ name: '2:00am, Friday, November 13th', value: 'You wake up suddenly. The sweat trickling down your back like rain. You listen closely to the creak of the stairs, you know that you are the only one home. What do you do?', inline: false },
								{ name: 'Response', value: 'Type 1 to explore what the noise is, type 2 to stay where you are.', inline: false },

							);
						const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
						const { MessageCollector } = require('discord.js-collector');

						const botMessage = await msg.channel.send(settingsembed);
						const userMessage = await MessageCollector.asyncQuestion({
							botMessage,
							user: msg.author.id,
						});
						if (userMessage.content === '1') {
							const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Mission 1: Skeletons are Scary!')
								.addFields(
									{ name: ':', value: 'You stumble off your bed, flashlight gripped in your left hand, the metal stings your hand. On your right hand, the baseball bat your dad gave you for your 5th birthday. Memories flood in your dad, mom, and friends flash in your eyes. You focus and crept toward the door, knuckles white. You slide the key into the keyhole and twist the key quickly. The door creaks with noise as you open it with your right foot. Outside, you see the cracked window in pieces on the ground. Someone has broken in. ', inline: false },
									{ name: 'Response', value: 'Type 3 to go up stairs or 4 to drive away.', inline: false },

								);
							const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
							const { MessageCollector } = require('discord.js-collector');

							const botMessage = await msg.channel.send(firstembed);
							const userMessage = await MessageCollector.asyncQuestion({
								botMessage,
								user: msg.author.id,
							});
							if (userMessage.content == '3') {
								const firstembed = new Discord.MessageEmbed()
									.setColor('#0099ff')
									.setTitle('Mission 1: Skeletons are Scary!')
									.addFields(
										{ name: ':', value: 'You turn to the right and slowly shuffle up the stairs. You stumble upon a stair and encounter a little girl. Your little girl. She is crying. You ask her who she is but she doesn’t answer. You think she is deaf. You tap her on your shoulder but your hand phases through. You think back, and ask yourself Did I die? You quickly rush outside and look inside of the grave you saw early. You see your body.', inline: false },

									);
								msg.channel.send(firstembed);
							}
							if (userMessage.content == '4') {
								const firstembed = new Discord.MessageEmbed()
									.setColor('#0099ff')
									.setTitle('Mission 1: Skeletons are Scary!')
									.addFields(
										{ name: ':', value: 'You get the keys to your car, and run to your car. The car’s windshield is broken with a bullethole in the driverseat’s headrest. You run away toward the road and stumble on the grave you saw earlier. You look inside of it and you see your parents! You see rustling of the leaves in the forest.', inline: false },
										{ name: 'Response', value: 'Type 5 to run away, type 6 to go towards the sound', inline: false },
									);
								const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
								const { MessageCollector } = require('discord.js-collector');

								const botMessage = await msg.channel.send(firstembed);
								const userMessage = await MessageCollector.asyncQuestion({
									botMessage,
									user: msg.author.id,
								});
								if (userMessage.content == '5') {
									const firstembed = new Discord.MessageEmbed()
										.setColor('#0099ff')
										.setTitle('Mission 1: Skeletons are Scary!')
										.addFields(
											{ name: ':', value: 'While running away, you realize you\'re hungry, so you eat a sandwich you packed. It tastes amazing, so you check what it was made of. You see lots of moving worms, and you die on the spot!', inline: false },
										);
									msg.channel.send(firstembed);
								}
								if (userMessage.content == '6') {
									const firstembed = new Discord.MessageEmbed()
										.setColor('#0099ff')
										.setTitle('Mission 1: Skeletons are Scary!')
										.addFields(
											{ name: ':', value: 'You scavenge through the forest towards the sound and you see a skeleton. It has glowing red eyes and a menacing aura. You run for your life and are somehow able to find society. The monster is now far behind. However, when you go to the grocery store to take cover, you notice everyone there is a skeleton! Then, they all start coming towards you. Not knowing what to do, you grab the nearest metal rod and hit the skeleton. It collapses, but the other ones are on your tail. There is a big rack you can push which will kill 5 skeletons (it might take too long and you might get hurt), or you can continue hitting them with your rod.', inline: false },
											{ name: 'Response', value: 'Type 7 to push the rack, type 8 to continue using melee', inline: false },
										);
									const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
									const { MessageCollector } = require('discord.js-collector');

									const botMessage = await msg.channel.send(firstembed);
									const userMessage = await MessageCollector.asyncQuestion({
										botMessage,
										user: msg.author.id,
									});
									if (userMessage.content == '7') {
										const firstembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle('Mission 1: Skeletons are Scary! SUCCESS!')
											.addFields(
												{ name: ':', value: 'You decide to push the rack. It\'s pretty easy to push, and you end up killing all the outstanding skeletons in the grocery store. You find 20 people hiding in the back of the store, and you arm them and tell them about your victory. You are awarded 75 coins for the highest class victory, use "storyprofile" to check your profile anytime you want!', inline: false },
											);
										connection.query('update profiles set missionnumber = ? where name = ?', [2, msg.member.user.username], function (error, results, fields) {
										});
										connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results1, fields) {

											connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 75, msg.member.user.username], function (error, results, fields) {
											});
										});
										msg.channel.send(firstembed);
									}
									if (userMessage.content == '8') {
										const firstembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle('Mission 1: Skeletons are Scary! SUCCESS!')
											.addFields(
												{ name: ':', value: 'Your weapon has lots of force, and with perseverance, you destroy all the skeletons in the grocery store. You are exasperated, but you see 20 shopper huddled in the back of the store and you inform them about your victory. You are awarded 50 coins for finishing your first mission, use "storyprofile" to see your profile anytime you want!', inline: false },
											);
										connection.query('update profiles set missionnumber = ? where name = ?', [2, msg.member.user.username], function (error, results, fields) {
										});
										connection.query('select * from profiles where name = ?', [msg.member.user.username], function (error, results1, fields) {

											connection.query('update profiles set coins = ? where name = ?', [results1[0].coins + 75, msg.member.user.username], function (error, results, fields) {
											});
										});
										msg.channel.send(firstembed);
									}

								}

							}

						}
						if (userMessage.content == '2') {
							const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Mission 1: Skeletons are Scary!')
								.addFields(
									{ name: ':', value: 'You decide to stay where you are. You hear a knock on your door and creep towards it. You unlock it and see your spouse with your child. They come in weeping, so you ask them why they are crying. They don’t respond. You try tapping your spouse on their shoulder, but you hand floats through. You sprint to the grave outside, and look at its contents. You see yourself.', inline: false },
								);
							msg.channel.send(firstembed);
						}


					}
					else if (results[0].missionnumber == '2') {
						const settingsembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Mission 2: The Base is always the strongest!')
							.addFields(
								{ name: '5:00pm, Thursday November 13th, Grocery Store', value: 'You look at the shoppers shoppers in front of you. You ask one of them what his name is. "My name is Carl. The lights were flickering like crazy and then a group of skeletons barged in!" he said with a shivering voice. You introduced yourself to the others. "Hello everyone! My name is Anthony Paul." you start. "I live in the farm down the road. I think we should setup a base here and take shifts to make sure that everyone will be safe." "You heard the man, lets grab all of the food and water we can and move it to the corner." Carl enforced.', inline: false },
								{ name: '8:00pm, Friday, November 13th, Grocery Store', value: '"Alright, good job everyone! I can take the first shift and Carl can take the second. Ask Carl if you want to signup." you suggest. Carl walks to the register, and takes out his computer and opens NotePad on his computer. Quickly, two strong and tall identical guys come to the register. "Sign us up for this. I am Barry and this is my twin brother, Billy." Barry explained. You walk towards the door of the grocery store with a weapon in your hand.', inline: false },
								{ name: '1:00am, Saturday, November 14th, Grocery Store', value: 'Look outside of the grocery store, you see a silhouette of 5 people.', inline: false },
								{ name: 'Response', value: 'Type 1 to alert everyone in the Grocery Store, type 2 to approach the group of people and question them.', inline: false },

							);
						const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
						const { MessageCollector } = require('discord.js-collector');

						const botMessage = await msg.channel.send(settingsembed);
						const userMessage = await MessageCollector.asyncQuestion({
							botMessage,
							user: msg.author.id,
						});
						if (userMessage.content === '1' && results[0].missionnumber == '2') {
							const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Mission 2: The Base is the always he strongest! SUCCESS!')
								.addFields(
									{ name: '1:05am, Saturday November 14th, Grocery Store', value: '"Carl, Carl!" you yell. "We have company." you exclaim. Everyone wakes up suddenly and you go to the shed and grab a hunting rifle and load it. You scope in on the group of people, and notice that they are not people, but skeletons. You shoot at one of their head. BAM!\n\n The skeleton\'s head falls off of its body. The body continues to walk. You scope into the same skeleton, and the skeleton falls forwards. You quickly finish off the rest of the skeletons. You have been awarded 50 coins to spend in the store. use ".store" to access the store.', inline: false },
									{ name: 'Response', value: 'Type 3 to celebrate with everyone in the Grocery Store.', inline: false },

								);
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins + 50, msg.member.user.username], function (error, results, fields) {
							});
							const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
							const { MessageCollector } = require('discord.js-collector');

							const botMessage = await msg.channel.send(firstembed);
							const userMessage = await MessageCollector.asyncQuestion({
								botMessage,
								user: msg.author.id,
							});

							if (userMessage.content == '3' && results[0].missionnumber == '2') {
								const firstembed = new Discord.MessageEmbed()
									.setColor('#0099ff')
									.setTitle('Mission 2: The Base is always the strongest! SUCCESS!')
									.addFields(
										{ name: '1:30am, Saturday November 14th, Grocery Store', value: '"Congrats everyone. We did it. We prevented an attack!" you exclaim. Carl suggests, " We should see what they were carrying." Carl, Barry, Billy, and yourself jog towards the bodies. You see the skeletons were carrying shotguns and you collect them. Now you have a shotgun!', inline: false },
										{ name: '2:00am, Saturday November 14th, Grocery Store', value: 'You walk over to Barry and ask him to look take watch. He wakes up suddenly and you are surprised by his swiftness because of his size. He plumps down next to the door with a shotgun that he arrived with. "Nice shotgun. Looks expensive. you comment. "Was my great grandpa\'s shotgun. Used it to help Native fight Spaniards. Took his life away from us." he explained."I am sorry. I did not kno-" you started. "Its fine. It was very brave of him and he was a good rolemodel to me". He explained. You lie down and sleep well.', inline: false },
										{ name: 'Response', value: 'Type 4 to continue.', inline: false },

									);
								connection.query('update profiles set shotgun = 1 where name = ?', [msg.member.user.username], function (error, results, fields) {
								});
								const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
								const { MessageCollector } = require('discord.js-collector');

								const botMessage = await msg.channel.send(firstembed);
								const userMessage = await MessageCollector.asyncQuestion({
									botMessage,
									user: msg.author.id,
								});


								if (userMessage.content == '4' && results[0].missionnumber == '2') {
									const firstembed = new Discord.MessageEmbed()
										.setColor('#0099ff')
										.setTitle('Mission 2: The Base is always the strongest! SUCCESS!')
										.addFields(
											{ name: '8:30am, Saturday November 14th, Grocery Store', value: '"Knock knock."..."You in there, Anthony?" Carl shook. You squint your eyes open. "Huh?" you groan. You look around. You see 15 new people. "Who are they?" you question. "They came from that way." Carl points towards the north. "Saw em\' \'bout half a mile down. They got some food and we have offered to allow them to stay." Carl explains. You question further, "We don\'t have enough space. or water to support everyone here. Why did you not wake me up? You-" you start to counter. "You seemed like you need some sleep after last night. We have set up three wells and have sent hunting parties out. We have enough food to last. We sent search parties which returned back with more food and water. We are asking people to help us build a wall and weapons to help." Carl inturupted. "Wow! All while I was asleep? Good Job!"', inline: false },
											{ name: 'End of Mission 2', value: 'You have collected: \n\n 1 Shotgun \n\n 1 Hunting Rifle', inline: false },
										);
									connection.query('update profiles set missionnumber = 3 where name = ?', [msg.member.user.username], function (error, results, fields) {
									});
									connection.query('update profiles set huntingrifle = 1 where name = ?', [msg.member.user.username], function (error, results, fields) {
									});
									connection.query('update profiles set shotgun = 1 where name = ?', [msg.member.user.username], function (error, results, fields) {
									});
									const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
									const { MessageCollector } = require('discord.js-collector');

									const botMessage = await msg.channel.send(firstembed);
									const userMessage = await MessageCollector.asyncQuestion({
										botMessage,
										user: msg.author.id,
									});


								}
							}
						}

						if (userMessage.content === '2' && results[0].missionnumber == '2') {
							const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Halloween Story!')
								.addFields(
									{ name: '1:05am, Saturday November 14th, Grocery Store', value: 'You quietly walk over to the shed. The door creaks as you open it. You reach towards the ammunition, but accidently drop bullet. You look down and see that there is carpet where the bullet dropped so no noise comes out. You grab the hunting rifle and load it. You walk outside into the cold night. The fog is mild so you keep walking. You squint your eyes and see a shotgun in each of the people\'s. You walk towards them "HEY!"..."HELLO!"..."Can you hear me?" You repeatedly ask. They turn around and you see that they are not people but skeletons. You quickly take a shot at one and miss. You are astonished by their ability to move and they slowly rip your limbs off and take you back to their home base.', inline: false },

								);
							msg.channel.send(firstembed);
						}
					}
					else if (results[0].missionnumber == '3') {
						const firstembed = new Discord.MessageEmbed()
							.setColor('#0099ff')
							.setTitle('Mission 3: Hardwork makes success!')
							.addFields(
								{ name: '7:00pm, Saturday November 14th, Grocery Store', value: 'Productivity of your camp increases exponentially after accepting the new people. You camp has almost finished building the walls and have so much resources. You look out into the setting sun and see a silloette of a small town.', inline: false },
								{ name: 'Response', value: 'If you want to go to the town and find survivors and resources type 1', inline: false },

							);
						const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
						const { MessageCollector } = require('discord.js-collector');

						const botMessage = await msg.channel.send(firstembed);
						const userMessage = await MessageCollector.asyncQuestion({
							botMessage,
							user: msg.author.id,

						});
						if (userMessage.content === '1' && results[0].missionnumber == '3') {
							const firstembed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle('Mission 3: Hardwork makes success!')
								.addFields(
									{ name: '7:30pm, Saturday November 14th, Grocery Store', value: 'You get Billy, Barry, and a few other volunteers and you all hike to the town. You see 20 people and a lot of resources. You all group up and return with all of the newly found resources. You gained 50 coins!', inline: false },
									{ name: 'Response', value: 'Type 3 to head back to camp with everyone else', inline: false },
								);
							connection.query('update profiles set coins = ? where name = ?', [results[0].coins + 50, msg.member.user.username], function (error, results, fields) {
							});
							const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
							const { MessageCollector } = require('discord.js-collector');

							const botMessage = await msg.channel.send(firstembed);
							const userMessage = await MessageCollector.asyncQuestion({
								botMessage,
								user: msg.author.id,

							});

							if (userMessage.content == '3' && results[0].missionnumber == '3') {
								const firstembed = new Discord.MessageEmbed()
									.setColor('#0099ff')
									.setTitle('Mission 3: Hardwork makes success!')
									.addFields(
										{ name: '9:00pm, Saturday November 14th, Grocery Store', value: '"Everyone, we have rescued some people in the neighboring town. We have also collected some resources." You excitedly say.', inline: false },
										{ name: '9:30am, Saturday November 14th, Grocery Store', value: '"Guys, our camp members has increased drastically, and I think we need an elected leader to make ourselves uniform." Carl suggested. "I think we should elect Carl as the leader!" Barry confirms. "I second that!" you agree. " All in favor of this desicion?" you question. It is unanimous and Carl is elected as camp leader. " I am choosing Anthony as my second in command!" he answers. "I...I don\'t think I am fit for that position" you respond. "Of course you do", reply Barry and Billy. Everyone starts to tell that they also support the desicion. "Alright, alright. I\'ll do it!" you say right before cheers erupt. Someone comes up to you and hand you his hand cannon. It looks really expensive and cool. "I already have a gun." you respond. "You saved us! This is my way of saying thanks, and I am not taking it back" he responds.', inline: false },
										{ name: 'Response', value: 'Type 4 to continue.', inline: false },
									);
								const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
								const { MessageCollector } = require('discord.js-collector');

								const botMessage = await msg.channel.send(firstembed);
								const userMessage = await MessageCollector.asyncQuestion({
									botMessage,
									user: msg.author.id,

								});
								if (userMessage.content == '4' && results[0].missionnumber == '3') {
									const firstembed = new Discord.MessageEmbed()
										.setColor('#0099ff')
										.setTitle('Mission 3: Hardwork makes success!')
										.addFields(
											{ name: '11:00pm, Saturday November 14th, Grocery Store', value: 'Just as you guys were celebrating your new elected leader, an arrow comes out from nowhere and kills someone. Bright red blood comes out of him, and all you could do is watch. Soon, another arrow comes and kills another civilian. As the leader, you can make the choice to run away or find where the arrows are coming from.', inline: false },
											{ name: 'Response', value: 'Type 5 to run away, type 6 to find where the arrows are coming from', inline: false },
										);
									const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
									const { MessageCollector } = require('discord.js-collector');

									const botMessage = await msg.channel.send(firstembed);
									const userMessage = await MessageCollector.asyncQuestion({
										botMessage,
										user: msg.author.id,
										

									});
									
									if (userMessage.content == '5' && results[0].missionnumber == '3') {
										const firstembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle('Mission 3: Hardwork makes success! FAILURE')
											.addFields(
												{ name: '11:30pm, Saturday November 14th, Grocery Store', value: 'You choose to tell everyone to run away. After running for a few minutes. you sadly fall off a cliff. You had 5000 coins in your pocket which weren\'t in the bank, so you lose these coins. Good luck next time!', inline: false },
											);
										connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 5000, msg.member.user.username], function (error, results, fields) {
										});
										const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
										const { MessageCollector } = require('discord.js-collector');

										const botMessage = await msg.channel.send(firstembed);
										const userMessage = await MessageCollector.asyncQuestion({
											botMessage,
											user: msg.author.id,

										});

									}
									if(userMessage.content == '6' && results[0].missionnumber == '3') {
										const firstembed = new Discord.MessageEmbed()
											.setColor('#0099ff')
											.setTitle('Mission 3: Hardwork makes success!')
											.addFields(
												{ name: '11:10 Saturday November 14th, Grocery Store', value: '"I see them" yells Barry."On the right side, there are 10 skeletons and are near the gas station." he informs.', inline: false },
												{ name: 'Response', value: 'Type 7 to blow the gas station up (There is a chance that everyone can die from this), type 8 to make everyone evacuate away from the gas station while you distract the skeletons.', inline: false },
											);
										const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
										const { MessageCollector } = require('discord.js-collector');
										const botMessage = await msg.channel.send(firstembed);
										const userMessage = await MessageCollector.asyncQuestion({
											botMessage,
											user: msg.author.id,
										});
										if(userMessage.content == '7' && results[0].missionnumber == '3') {
											const firstembed = new Discord.MessageEmbed()
												.setColor('#0099ff')
												.setTitle('Mission 3: Hardwork makes success! SUCCESS!')
												.addFields(
													{ name: '11:15 Saturday November 14th, Grocery Store', value: 'You ask everyone to move to the side opposite to the gas station and shoot a bullet into a gas pump and then cover your ears.\n\n BOOM! The entire gas station explodes along with the skeletons but luckily everyone else is safe. Cheers erupt and everyone lifts you up! You are awarded 10000 coins', inline: false },
													{ name: 'Response', value: 'Type 9 to continue', inline: false },
												);
												connection.query('update profiles set coins = ? where name = ?', [results[0].coins + 10000, msg.member.user.username], function(error, results, fields) {
												});
											const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
											const { MessageCollector } = require('discord.js-collector');
											const botMessage = await msg.channel.send(firstembed);
											const userMessage = await MessageCollector.asyncQuestion({
												botMessage,
												user: msg.author.id,
											});
											if(userMessage.content == '9' && results[0].missionnumber == '3') {
												const firstembed = new Discord.MessageEmbed()
													.setColor('#0099ff')
													.setTitle('Mission 3: Hardwork makes success! SUCCESS!')
													.addFields(
														{ name: '12pm Sunday November 15th, Grocery Store', value: 'Barry and you both stay up and take watch while the others go to sleep.', inline: false },
														{ name: 'End of Mission 3', value:  'You have upgraded your base', inline: false },
													);
													connection.query('update profiles set missionnumber = ? where name = ?', [4, msg.member.user.username], function(error, results, fields) {
													});
												const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
												const { MessageCollector } = require('discord.js-collector');
												const botMessage = await msg.channel.send(firstembed);
												const userMessage = await MessageCollector.asyncQuestion({
													botMessage,
													user: msg.author.id,
												});
											}
										}
										if(userMessage.content == '8' && results[0].missionnumber == '3') {
											const firstembed = new Discord.MessageEmbed()
												.setColor('#0099ff')
												.setTitle('Mission 3: Hardwork makes success! FAILURE!')
												.addFields(
													{ name: '11:15 Saturday November 14th, Grocery Store', value: 'You ask everyone to quietly and quickly exit the building. Just as you do a landmine explodes and kills everyone. You lost 5000 coins.', inline: false },
													{ name: 'Response', value: 'Type 9 to continue', inline: false },
												);
												connection.query('update profiles set coins = ? where name = ?', [results[0].coins - 5000, msg.member.user.username], function(error, results, fields) {
												});
											const filter = msg.channel.awaitMessages(m => m.author.id === msg.author.id);
											const { MessageCollector } = require('discord.js-collector');
											const botMessage = await msg.channel.send(firstembed);
											const userMessage = await MessageCollector.asyncQuestion({
												botMessage,
												user: msg.author.id,
											});
										}
									}

								}
							}

						}
					}
					else if(results[0].missionnumber == 4){
						msg.reply('Sorry, that story wasn\'t made yet :(')
					}

				});

	},
};