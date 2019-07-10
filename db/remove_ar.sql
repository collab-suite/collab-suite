delete from active_users where room_id = ${ar_id};
delete from messages where room_id = ${room_id};
delete from active_rooms where room_id = ${room_id}