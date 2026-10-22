-- Generated from data/gallery.json and data/lyrics.json. Safe to re-run.

insert into gallery ("id", "title", "category", "imageUrl", "caption", "featured", "span", "createdAt") values
  ('gal_live_praise_fire', 'Fire on the Altar', 'Live Concerts', '/images/live_praise_fire.jpg', 'Hands lifted mid-praise as the whole auditorium breaks into worship.', true, 'wide', '2026-09-01T12:00:00.000Z'),
  ('gal_reverb_joy_denim', 'Pure Joy', 'The Reverb', '/images/reverb_joy_denim.jpg', 'Caught mid-laugh during a praise break with the band in full flight.', true, 'normal', '2026-09-01T11:00:00.000Z'),
  ('gal_live_crowd_bw', 'Every Hand Lifted', 'Live Concerts', '/images/live_crowd_bw.jpg', 'Turning the room over to the congregation, with not a single seat still.', true, 'tall', '2026-09-01T10:00:00.000Z'),
  ('gal_live_worship_portrait', 'Lifted Voice', 'Live Concerts', '/images/live_worship_portrait.jpg', 'Deep in the song, hand open, leading the house into adoration.', true, 'normal', '2026-09-01T09:00:00.000Z'),
  ('gal_reverb_praise_lean', 'All the Way Back', 'The Reverb', '/images/reverb_praise_lean.jpg', 'The praise team leaning into the last chorus of the night.', true, 'wide', '2026-09-01T08:00:00.000Z'),
  ('gal_live_congregation', 'Face to Face', 'Live Concerts', '/images/live_congregation.jpg', 'Stepping to the edge of the stage to sing straight into the crowd.', true, 'normal', '2026-09-01T07:00:00.000Z'),
  ('gal_reverb_ministering', 'A Word Before the Song', 'The Reverb', '/images/reverb_ministering.jpg', 'A moment of exhortation between ministrations.', true, 'normal', '2026-09-01T06:00:00.000Z'),
  ('gal_about_award_portrait_v2', 'Minister Lilian Nneji', 'Portraits', '/images/about_award_portrait_v2.jpg', 'On stage, mid-ministration, in her signature white cap.', true, 'normal', '2026-09-01T05:00:00.000Z'),
  ('gal_live_dancers_stage', 'Praise in Motion', 'Live Concerts', '/images/live_dancers_stage.jpg', 'The full company of dancers and singers moving as one.', false, 'wide', '2026-09-01T04:00:00.000Z'),
  ('gal_reverb_banner_stage', 'Now Ministering', 'The Reverb', '/images/reverb_banner_stage.jpg', 'Taking the stage as the house rises to its feet.', false, 'normal', '2026-09-01T03:00:00.000Z'),
  ('gal_live_choir_wide', 'The Full Stage', 'Live Concerts', '/images/live_choir_wide.jpg', 'Backing vocalists and dancers in formation under the crest.', false, 'normal', '2026-09-01T02:00:00.000Z'),
  ('gal_reverb_praise_team', 'The Praise Team', 'The Reverb', '/images/reverb_praise_team.jpg', 'Voices in blue, carrying the harmony behind the lead.', false, 'wide', '2026-09-01T01:00:00.000Z'),
  ('gal_about_yellow_studio_v2', 'In Full Voice', 'Portraits', '/images/about_yellow_studio_v2.jpg', 'Holding a long note with the band driving behind her.', false, 'tall', '2026-09-01T00:00:00.000Z'),
  ('gal_live_duet_stage', 'Call and Response', 'Live Concerts', '/images/live_duet_stage.jpg', 'Trading lines with a backing vocalist mid-song.', false, 'normal', '2026-08-31T23:00:00.000Z'),
  ('gal_band_drummers', 'Talking Drums', 'Praise Team & Band', '/images/band_drummers.jpg', 'The percussion section driving the tempo of the praise.', false, 'normal', '2026-08-31T22:00:00.000Z'),
  ('gal_reverb_polaroid_3_v2', 'Two Voices, One Song', 'Live Concerts', '/images/reverb_polaroid_3_v2.jpg', 'Leading a call-and-response with one of the vocalists.', false, 'normal', '2026-08-31T21:00:00.000Z'),
  ('gal_stay_in_touch_bw_v2', 'Between Sets', 'Portraits', '/images/stay_in_touch_bw_v2.jpg', 'A quiet moment off-stage before the next ministration.', false, 'wide', '2026-08-31T20:00:00.000Z'),
  ('gal_band_talking_drum_bw', 'The Drummer', 'Praise Team & Band', '/images/band_talking_drum_bw.jpg', 'Talking drum in hand, holding the groove together.', false, 'tall', '2026-08-31T19:00:00.000Z'),
  ('gal_reverb_wide_stage', 'Packed House', 'The Reverb', '/images/reverb_wide_stage.jpg', 'A full room from the back of the hall.', false, 'wide', '2026-08-31T18:00:00.000Z'),
  ('gal_band_keys_bass', 'Keys and Bass', 'Praise Team & Band', '/images/band_keys_bass.jpg', 'The rhythm section laying the foundation for the praise.', false, 'normal', '2026-08-31T17:00:00.000Z'),
  ('gal_reverb_polaroid_2_v2', 'Bowed in Worship', 'Live Concerts', '/images/reverb_polaroid_2_v2.jpg', 'The dancers bowed low as the room shifts into worship.', false, 'normal', '2026-08-31T16:00:00.000Z'),
  ('gal_reverb_polaroid_1_v2', 'Voices in Blue', 'The Reverb', '/images/reverb_polaroid_1_v2.jpg', 'The praise team mid-song under the stage lights.', false, 'normal', '2026-08-31T15:00:00.000Z'),
  ('gal_band_guitars_bw', 'Strings', 'Praise Team & Band', '/images/band_guitars_bw.jpg', 'Lead and bass guitar locked in behind the vocals.', false, 'tall', '2026-08-31T14:00:00.000Z')
on conflict ("id") do nothing;

insert into lyrics ("id", "title", "category", "album", "releaseYear", "youtubeUrl", "featured", "createdAt", "lyrics") values
  ('lyr_omeriwo_omeriwo_reprise', 'Omeriwo Omeriwo (Reprise)', 'Prophetic Worship', 'Single (Live)', '2025', 'https://www.youtube.com/watch?v=A68T0Az-LUA', true, '2026-09-01T06:00:00.000Z', ''),
  ('lyr_eze_mu_o', 'Eze Mu O', 'Prophetic Worship', 'Single', '2026', 'https://www.youtube.com/watch?v=DzjflH8peQY', true, '2026-09-01T12:00:00.000Z', ''),
  ('lyr_jesus_nke_nazareth', 'Jesus Nke Nazareth', 'Prophetic Worship', 'Single', '2026', 'https://www.youtube.com/watch?v=J_02EibFwd0', true, '2026-09-01T11:00:00.000Z', ''),
  ('lyr_miracles_everywhere_live', 'Miracles Everywhere (Live)', 'High Praise', 'Single', '2026', 'https://www.youtube.com/watch?v=LTGjfXEFjKQ', true, '2026-09-01T10:00:00.000Z', ''),
  ('lyr_lng_praise_medley', 'LNG Praise Medley', 'High Praise', 'LNG Praise Medley (EP)', '2026', 'https://www.youtube.com/watch?v=a9hKkxfWWdk', true, '2026-09-01T09:00:00.000Z', ''),
  ('lyr_if_e_reach_your_turn', 'If E Reach Your Turn', 'Afro-Gospel', 'Single', '2025', 'https://www.youtube.com/watch?v=Vd4W1wxs0hQ', false, '2026-09-01T08:00:00.000Z', ''),
  ('lyr_elohim', 'Elohim', 'Prophetic Worship', 'Single', '2025', 'https://www.youtube.com/watch?v=nLITWXwcUNQ', false, '2026-09-01T07:00:00.000Z', ''),
  ('lyr_daalu', 'Daalu', 'Thanksgiving', 'Single', '2024', 'https://www.youtube.com/watch?v=GUkdF3GIbVc', false, '2026-09-01T05:00:00.000Z', ''),
  ('lyr_grateful', 'Grateful', 'Thanksgiving', 'Single', '2024', 'https://www.youtube.com/watch?v=twamtRz-gDQ', false, '2026-09-01T04:00:00.000Z', ''),
  ('lyr_this_kind_god_praise_vibes', 'This Kind God (Praise Vibes)', 'High Praise', 'Single, feat. Anointed Praise Band', '2024', 'https://www.youtube.com/watch?v=lwSU9-EzuLo', false, '2026-09-01T03:00:00.000Z', ''),
  ('lyr_praise_overload_live', 'Praise Overload (Live)', 'High Praise', 'Single (Live)', '2023', 'https://www.youtube.com/watch?v=gfz0-Sb8Zi4', false, '2026-09-01T02:00:00.000Z', ''),
  ('lyr_onwere_ihe_omere_m', 'Onwere Ihe Omere Mù', 'Thanksgiving', 'Single (Live)', '2023', 'https://www.youtube.com/watch?v=xycVqgocXTI', false, '2026-09-01T01:00:00.000Z', '[Intro]
Common
Let us enter his gates with Thanksgiving, come into his Courts with praise,
For his mercies endureth forever
And ever and ever Amen (x2)

[Chorus]
Onwere ihe o mere mù
(There is something that he did)
Nji asi ya nara ekele
(That''s why I''m thanking him)
Ayaah
Onwere ihe o mere mù nji
(There is something that he did for me)
Nji asi ya nara ekele
(That''s why I''m thanking him) (x2)

[Call and Response]
Call: Onyere mu udo o (He gave me peace)
Resp: Nji a si ya na ra ekele (That''s why I''m thanking him)
Call: Onyere mu ndù o (He gave me life)
Resp: Nji a si ya na ra ekele (That''s why I''m thanking him)
Call: Onyere mù di (He gave me a husband)
Resp: Nji a si ya nara ekele (That''s why I''m thanking him)
Call: Onyere mu nwa e (He gave me a child)
Resp: Nji a si ya nara ekele (That''s why I''m thanking him)

Onwere ihe o mere mù wo wo wo
(There is something that he did for me)
Onwere ihe o mere mù
(There is something that he did for me)
Nji a si ya nara ekele
(That''s why I''m thanking him)
Onye ne me mma e (Good God)
Onwere ihe o mere mu
(There is something that he did for me)
Nji a si ya nara ekele
(That''s why I''m thanking him)
(x2)

Òdùm ebo Judiah (Lion of Judah)
Onwere ihe o mere mù
(There is something that he did for me)
Ewo Jesus e (Oh Jesus)
Onye ne me mma le e (Good God)
Onwere ihe o mere mu
(There is something that he did for me)
Jesus e
Nji a si ya nara ekele
(That''s why I''m thanking him)
There is something He did wo wo wo
Ayaah

[Testimony]
I ask for joy o — He gave me joy.
I ask for peace o — He gave me peace.
I ask for life o — He gave me life.
I ask for husband — He gave me husband.
I ask for children — He gave me children.
There is something He did wo wo wo
Ahaa
Ayah
Seli we

Onwere ihe o mere mù
(There is something that he did for me)
Nji a si ya nara ekele
(That''s why I''m thanking him)
Odùm ebo Judiah (Lion of Judah)
Onwere ihe o mere mù
(There is something that he did for me)
Jesus e
Nji a si ya nara ekele
(That''s why I''m thanking him) (x2)

[Thanksgiving Roll Call]
Onye ne me mma (Good God)
Biko nara ekele (Please receive thanks)
Onye ne nye ego (Wealth giver)
Biko nara ekele (Please receive thanks)
Onye na za ekpere (Prayer answering God)
Biko nara ekele (Please receive thanks)
Onye na nye ndù o (Life Giver)
Nara ekele (Receive thanks)
Onye ne nye di (Husband Giver)
Biko nara ekele (Please receive thanks)
Onye ne nye nwa (Child giver)
Biko nara ekele (Please receive thanks)
Odogwu — nara ekele (x2) (Powerful… Receive thanks)
Oke mmò (Powerful Spirit)
Nara ekele (x2) (Receive thanks)
Chai — Agù ne che mba (City Keeper)
Biko nara ekele (Please Receive thanks)
Chukwu na gwò òria (God that heals)
Biko nara ekele (Please Receive thanks)
Onye ne nye udo (Peace Giver)
Biko nara ekele (Please receive thanks)
Onye ne me mma (Good God)
Biko nara ekele (Please receive thanks)
Onwere ihe o mere mù wo wo woo.
(There is something that he did)

[Vamp]
Call: Kpò ya (Call him)
Resp: Olori ihe loro enyi (x4)
(The one that swallowed what swallowed the Elephant)
Call: Olori ihe loro enyi (x2)
Resp: Olori ihe loro enyi (x2)
Call: Jesus e
Resp: Olori ihe loro enyi (x2)
Call: Ebube dike (Glorious God)
Resp: Olori ihe loro enyi (x2)
Call: Onyeòma e (Good God)
Resp: Olori ihe loro enyi
Call: Olori ihe loro enyi (x4)
Resp: Olori ihe loro enyi (x4)
Call: Jesus e (x3)
Resp: Olori ihe loro enyi (x3)
Call: Olori ihe loro enyi (x2)
Resp: Olori ihe loro enyi (x2)
Call: Ebube dike (x2) (Glorious God)
Resp: Olori ihe loro enyi (x2)
Call: Onyeòma e (x3) (Good God)
Resp: Olori ihe loro enyi (x3)
Call: Olori ihe loro enyi (x2)
Resp: Olori ihe loro enyi (x2)
Call: Jesus e (x3)
Resp: Olori ihe loro enyi (x3)
Call: Che che che
Resp: Olori ihe loro enyi
Che che che che
Olori ihe loro enyi
Che che che che
Olori ihe loro enyi
Che che che che
Olori ihe loro enyi
Jesus e — Olori ihe loro enyi
Olori ihe loro enyi (x2)
Olori ihe loro enyi (x2)
Call: Ebube dike (x3) (Glorious God)
Resp: Olori ihe loro enyi (x3)
Call: Olori ihe loro enyi (x3)
Resp: Olori ihe loro enyi (x3)
(The one that swallowed what swallowed the Elephant)'),
  ('lyr_e_get_why', 'E Get Why', 'Afro-Gospel', 'Single', '2022', 'https://www.youtube.com/watch?v=r7_1GGfz0L8', false, '2026-09-01T00:00:00.000Z', '[Intro]
If you don''t know my story
You won''t understand the glory
I tell you…
E get Whyyyyy….
Aeeeeee

[Solo 1]
E get why o why I dey praise my God, why I dey give am glory e…
E get why
E get why o why I dey sing his praise o, you fit no understand o e…
E get why
Shey na him favor abi na him goodness, which one make I count e e
E get why
E get why o why I dey lift my voice o, you fit no understand o e…
E get why

Oyaaa

[Chorus]
E get why o…
Now I know
I go sing am loud e…
Now I know
E get why o…
Now I know
I go shout am loud ee…
Now I know

[Interlude]
Common
Eeeee
Eeeee
Common
Eeeee
Eeeee

[Solo 2]
He turned my mourning to dancing… Dancing
He turned my sorrow to Joy… Joy
He turned my weeping to laughter
Now I can sing and say thank you Lord
Then he turned my shame to glory… Glory
He turned my pain to fame… Fame
He put the devil to shame o
Now I can sing and say thank you Lord…
Oooo

[Chorus 2]
E get why o….
Now I know
The reason why he saved me e…
Now I know
Say say say
E get why o
Now I know
The reason why he loved me e
Now I know
Say say say
E get why o….
Now I know
And I go sing am loud e
Now I know
Say say say
E get why o,
Now I know
I go shout am loud e
Now I know

[Bridge]
O give thanks to the Lord
For he is good, his mercy endures forever…
(x4)
Oooo

[Chorus 2]
E get why o….
Now I know
The reason why he saved me e…
Now I know
Say say say
E get why o
Now I know
The reason why he loved me e
Now I know
Say say say
E get why o….
Now I know
The reason why he saved me e…
Now I know
Oooo
E get why o
Now I know
The reason why he loved me e
Now I know
Say say say
E get why o…
Now I know
I go sing am loud e
Now I know
I know E get why o..
Now I know
Ee The reason why he loved me e…
Now I know

[Outro]
Tfreto…
Guitar play
Now I know (x4)'),
  ('lyr_ntughari_turn_around', 'Ntughari (Turn Around)', 'Afro-Gospel', 'Single', '2021', '', false, '2026-08-31T23:00:00.000Z', ''),
  ('lyr_mercy', 'Mercy', 'Thanksgiving', 'Single', '2020', 'https://www.youtube.com/watch?v=XM6WId4nVAc', false, '2026-08-31T22:00:00.000Z', ''),
  ('lyr_ko_joo_never', 'Ko Joo (Never)', 'Afro-Gospel', 'Single', '2019', 'https://www.youtube.com/watch?v=o6YwOAx2bJc', false, '2026-08-31T21:00:00.000Z', ''),
  ('lyr_odogwu_n_agha', 'Odogwu N''agha', 'High Praise', 'Single', '2018', 'https://www.youtube.com/watch?v=u9a4yCTN-wA', false, '2026-08-31T20:00:00.000Z', '')
on conflict ("id") do nothing;
