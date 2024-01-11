package entity

import (
	"time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() (*gorm.DB, error){
	var err error
	var database *gorm.DB
	database, err = gorm.Open(sqlite.Open("Database_team03.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	database.AutoMigrate(
		&Gender{},
		&Prefix{},
		&Topic{},
		&Target{},
		&Soundtrack{},
		&Genre{},
		&Categories{},
		&Color{},
		&CategoriesWatchlist{},
		&Rating{},
		&SubscribeStatus{},
		&PaymentStatus{},
		&Package{},
		&Subscribe{},
		&User{},
		&Payment{},
		&Report{},
		&Movie{},
		&Review{},
		&History{},
		&Download{},
		&Watchlist{},
		&WatchlistMovie{},
	
	)
	db = database
	/////////////////////////////////////USER/////////////////////////////////////////////
	male := Gender{
		Gender: "ชาย",
	}
	female := Gender{
		Gender: "หญิง",
	}
	ohter := Gender{
		Gender: "ไม่ระบุ",
	}
	db.Model(&Gender{}).Create(&male)
	db.Model(&Gender{}).Create(&female)
	db.Model(&Gender{}).Create(&ohter)

	mr := Prefix{
		Prefix: "นาย",
	}
	mrs := Prefix{
		Prefix: "นาง",
	}
	mrss := Prefix{
		Prefix: "นางสาว",
	}
	db.Model(&Prefix{}).Create(&mr)
	db.Model(&Prefix{}).Create(&mrs)
	db.Model(&Prefix{}).Create(&mrss)

	admin := StatusUser{
		Status: "admin",
	}
	user := StatusUser{
		Status: "user",
	}
	
	db.Model(&StatusUser{}).Create(&admin)
	db.Model(&StatusUser{}).Create(&user)

	waiting := SubscribeStatus{
		Status: "Waiting",
	}
	allowed := SubscribeStatus{
		Status: "Allowed",
	}
	notallowed := SubscribeStatus{
		Status: "NotAllowed",
	}
	
	db.Model(&SubscribeStatus{}).Create(&waiting)
	db.Model(&SubscribeStatus{}).Create(&allowed)
	db.Model(&SubscribeStatus{}).Create(&notallowed)

	allowedAdmin := PaymentStatus{
		Status: "Allowed",
		
	}
	notallowedAdmin := PaymentStatus{
		Status: "NotAllowed",
	}
	
	db.Model(&PaymentStatus{}).Create(&allowedAdmin)
	db.Model(&PaymentStatus{}).Create(&notallowedAdmin)

	

	adminlogin := User{
		Username:     "admin naja",
		Email:        "admin@gmail.com",
		Password:     "admin",
		Firstname:    "-",
		Lastname:     "-",
		StatusUserID: &admin.ID,
	}
	user1 := User{
		Username:     "user1",
		Email:        "user1@gmail.com",
		Password:     "user1",
		Firstname:    "user1F",
		Lastname:     "user1L",
		Address:      "111 University Avenue, Suranaree Sub DistrictMuang Nakhon Ratchasima, Nakhon Ratchasima 30000, Thailand",		
		
		StatusUserID: &user.ID,
	}
	user2 := User{
		Username:     "user2",
		Email:        "user2@gmail.com",
		Password:     "user2",
		Firstname:    "user2F",
		Lastname:     "user2L",
		Address:      "222 University Avenue, Suranaree Sub DistrictMuang Nakhon Ratchasima, Nakhon Ratchasima 30000, Thailand",		
		
		StatusUserID: &user.ID,
	}
	db.Model(&User{}).Create(&adminlogin)
	db.Model(&User{}).Create(&user1)
	db.Model(&User{}).Create(&user2)

	/////////////////////////////////////MOVIES/////////////////////////////////////////////
	drama := Categories{
		Categories: "ดราม่า(Drama)",
	}
	action := Categories{
		Categories: "แอคชั่น(Action)",
	}
	comedy := Categories{
		Categories: "ตลก(Comedy)",
	}
	horror := Categories{
		Categories: "สยองขวัญ (Horror)",
	}
	fantasy := Categories{
		Categories: "แฟนตาซี (Fantasy)",
	}
	db.Model(&Categories{}).Create(&drama)
	db.Model(&Categories{}).Create(&action)
	db.Model(&Categories{}).Create(&comedy)
	db.Model(&Categories{}).Create(&horror)
	db.Model(&Categories{}).Create(&fantasy)

	soundthai := Soundtrack{
		Soundtrack: "เสียงไทย",
	}
	soundeng := Soundtrack{
		Soundtrack: "เสียงอังกฤษ",
	}
	db.Model(&Soundtrack{}).Create(&soundthai)
	db.Model(&Soundtrack{}).Create(&soundeng)

	targetkid := Target{
		Target: "สำหรับเด็ก",
	}
	targetgeneral := Target{
		Target: "สำหรับทุกวัย",
	}
	targetadult := Target{
		Target: "สำหรับผู้ใหญ่",
	}
	db.Model(&Target{}).Create(&targetkid)
	db.Model(&Target{}).Create(&targetgeneral)
	db.Model(&Target{}).Create(&targetadult)

	movie1 := Movie{
		Title:        "The Killer(2023)",
		Duration:     "118",
		Description:  "The Killer ดัดแปลงจากนิยายภาพในชื่อเดียวกันของ Alexis Nolent ว่าด้วยเรื่องราวของนักฆ่าผู้ใช้ชีวิตอย่างรัดกุมรอบคอบ และมีแบบแผนในทุกการกระทำ แต่แล้วชีวิตของเขาต้องเปลี่ยนไป เมื่อความผิดพลาดเพียงครั้งเดียวทำให้เขาต้องต่อสู้กับผู้ว่าจ้างและตัวเองในปฏิบัติการไล่ล่าข้ามโลก ซึ่งเขายืนกรานว่าไม่เกี่ยวกับเรื่องส่วนตัว",
		ReleaseDate:  time.Date(2023, 9, 3, 0, 0, 0, 0, time.UTC),
		Director:     "David Fincher",
		Cast:         "Michael Fassbender,Tilda Swinton,Charles Parnell",
		Image:        "https://i.imgur.com/L30TIsI.jpg",
		Video:        "https://www.youtube.com/watch?v=5S7FR_HCg9g",
		CategoriesID: &drama.ID,
		SoundtrackID: &soundthai.ID,
		TargetID:     &targetadult.ID,
	}
	movie2 := Movie{
		Title:        "The Hunger Games: The Ballad of Songbirds & Snakes",
		Duration:     "157",
		Description:  "คอริโอลานุส สโนว์ (รับบทโดย ทอม บลายธ์) หนุ่มน้อยทายาทคนสุดท้ายของตระกูลที่ล่มสลายจากสงครามครั้งใหญ่ในแคปิตอล เขาได้รับมอบหมายให้เป็นพี่เลี้ยงของ ลูซี่ เกรย์ แบร์ด (รับบทโดย เรเชล เซกเลอร์) เด็กสาวบรรณาการจากเขต 12 ที่เข้าร่วมการแข่งขันเกมล่าชีวิตครั้งที่ 10 ก่อนที่ความสัมพันธ์ของทั้งสองจะก่อตัวขึ้นท่ามกลางเกมที่มีเดิมพันเป็นความเป็นความตาย",
		ReleaseDate:  time.Date(2023, 11, 5, 0, 0, 0, 0, time.UTC),
		Director:     "Francis Lawrence",
		Cast:         "Rachel Zegler,Tom Blyth,Violas Davis",
		Image:        "https://i.imgur.com/bWgVu4c.jpg",
		Video:        "https://www.youtube.com/watch?v=RDE6Uz73A7g",
		CategoriesID: &drama.ID,
		SoundtrackID: &soundthai.ID,
		TargetID:     &targetgeneral.ID,
	}
	movie3 := Movie{
		Title:        "Oppenheimer",
		Duration:     "180",
		Description:  "เรื่องราวของ Oppenheimer ชายผู้มีปัญหาในตัวเองมากมาย แต่ก็ถูกมองข้ามไปด้วยความปราดเปรื่องของตัวเขา เมื่อเขาถูกขอความช่วยเหลือให้หาหนทางยุติสงครามโลกครั้งที่สอง เขาก็ชี้ไปที่ความหวังเดียวเท่านั้น คือ อาวุธปรมาณูที่มีพลังทำลายล้างรุนแรงจนสามารถยับยั้งไม่ให้ทุกฝ่ายต่อสู้กันต่อไปได้อีก",
		ReleaseDate:  time.Date(2023, 7, 21, 0, 0, 0, 0, time.UTC),
		Director:     "Christopher Nolan",
		Cast:         "Cillian Murphy, Emily Blunt, Matt Damon",
		Image:        "https://i.imgur.com/VIQdyDD.jpg",
		Video:        "https://www.youtube.com/watch?v=uYPbbksJxIg",
		CategoriesID: &drama.ID,
		SoundtrackID: &soundthai.ID,
		TargetID:     &targetadult.ID,
	}
	movie4 := Movie{
		Title:        "Spider-Man: Across the Spider-Verse (2023)",
		Duration:     "140",
		Description:  "ไมลส์ มอราลเลส กลับมาอีกครั้งกับเรื่องราวบทใหม่ของการผจญภัยของเพื่อนบ้านที่แสนดีแห่งบรู๊คลิน ไปสู่มัลติเวิร์สร่วมกับ เกวน สเตซี่ ของผองเพื่อนมนุษย์แมงมุมเพื่อเผชิญหน้ากับวายร้ายที่ทรงพลังยิ่งกว่าที่พวกเขาเคยเจอ",
		ReleaseDate:  time.Date(2023, 5, 30, 0, 0, 0, 0, time.UTC),
		Director:     "Joaquim Dos Santos, Kemp Powers, Justin K. Thompson",
		Cast:         "Shameik Moore, Hailee Steinfeld, Brian Tyree Henry, Luna Lauren Velez",
		Image:        "https://i.imgur.com/cPgk3pr.jpg",
		Video:        "https://www.youtube.com/watch?v=shW9i6k8cB0",
		CategoriesID: &action.ID,
		SoundtrackID: &soundeng.ID,
		TargetID:     &targetgeneral.ID,
	}
	movie5 := Movie{
		Title:        "Toy Story",
		Duration:     "81",
		Description:  "วูดดี้ ของเล่นคาวบอยยุคคลาสสิก ในฐานะของเล่นตัวโปรดของแอนดี้ เด็กชายวัย 6 ขวบ ทำให้วูดดี้กลายเป็นหัวหน้าบรรดาของเล่น ด้วยความมาดมั่น ใกล้วันที่ย้ายบ้าน แอนดี้ จึงจัดวันเกิดก่อนวันเกิดจริง แต่เมื่อบัซ ไลท์เยียร์ ตุ๊กตาตำรวจอวกาศที่แม่ให้เป็นของขวัญเซอร์ไพรส์ ได้ก้าวเข้าในถิ่นของวูดดี้ ในฐานะของขวัญวันเกิดชิ้นโปรดของแอนดี้ การชิงดีชิงเด่น เพื่อเป็นขวัญใจ ของเจ้านายตัวน้อยจึงเกิดขึ้น",
		ReleaseDate:  time.Date(1995, 11, 19, 0, 0, 0, 0, time.UTC),
		Director:     "John Lasseter",
		Cast:         "Tom Hanks, Tim Allen, Don Rickles",
		Image:        "https://i.imgur.com/Xx8fSKW.jpg",
		Video:        "https://youtu.be/CxwTLktovTU",
		CategoriesID: &comedy.ID,
		SoundtrackID: &soundeng.ID,
		TargetID:     &targetkid.ID,
	}
	db.Model(&Movie{}).Create(&movie1)
	db.Model(&Movie{}).Create(&movie2)
	db.Model(&Movie{}).Create(&movie3)
	db.Model(&Movie{}).Create(&movie4)
	db.Model(&Movie{}).Create(&movie5)

	package1 := Package{
		PackageName:    "Package 1",
		Price:          99.0,
		PackageDetail:  "ดูได้ 1 ความระเอียด 720p ดาวน์โหลดไม่ได้",
		DownloadStatus: false,
	}
	

	package2 := Package{
		PackageName:    "Package 2",
		Price:          359.0,
		PackageDetail:  "ดูได้ 2 ความระเอียด 1080p ดาวน์โหลดได้",
		DownloadStatus: true,
	}
	

	package3 := Package{
		PackageName:    "Package 3",
		Price:          499.0,
		PackageDetail:  "ดูได้ 4 ความระเอียด 1080p ดาวน์โหลดได้",
		DownloadStatus: true,
	}
	db.Model(&Package{}).Create(&package1)
	db.Model(&Package{}).Create(&package2)
	db.Model(&Package{}).Create(&package3)

	// ==============================Review Setup============
	rating1 := Rating{
		RatingValue: 1,
	}
	db.Model(&Rating{}).Create(&rating1)
	
	rating2 := Rating{
		RatingValue: 2,
	}
	db.Model(&Rating{}).Create(&rating2)
	
	rating3 := Rating{
		RatingValue: 3,
	}
	db.Model(&Rating{}).Create(&rating3)
	
	rating4 := Rating{
		RatingValue: 4,
	}
	db.Model(&Rating{}).Create(&rating4)
	
	rating5 := Rating{
		RatingValue: 5,
	}
	db.Model(&Rating{}).Create(&rating5)
	
	genre1 := Genre{
		Name:"แง่บวก",
	
	}
	db.Model(&Genre{}).Create(&genre1)
	
	genre2 := Genre{
		Name:"แง่ลบ",
	
	}
	db.Model(&Genre{}).Create(&genre2)
		
	return database, nil
}
