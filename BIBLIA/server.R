library(shiny)


shinyServer(function(input, output) { 
  
  
  
  
  output$Commandments=renderImage({
    filename <- normalizePath(file.path('Commandments.png'))
    
    # Return a list containing the filename and alt text
    list(src = filename,width="950" ,
         height="500"
    )
  },deleteFile = FALSE)
  
 
  
  

  
  link_LAW=
    a("請參考：新約信徒需要守律法嗎？(基要書室)", 
      href="https://github.com/jc4878cu/BIBLE-study/blob/main/新約信徒要守律法嗎.pdf", 
      style = "color:blue;font-size:18px", target="_blank")
 
 

  
  ## 
  link_STANFORD_RevTang =
    a("Symposium at Stanford University｜史丹福Stanford 大學講座 （唐崇榮牧師 - 存在、虛空、永恆）", 
      href="https://www.youtube.com/watch?v=M7HgFMUseME", 
      style = "color:blue;font-size:18px", target="_blank")
  
  output$link_STANFORD_RevTang=renderUI({
    tagList(link_STANFORD_RevTang)
    
  })
  #
  
  link_CH7_0=
    a("聖經共享：BIBLE for Everyone", 
      href="https://bibleeveryone.com/index.php",
      style = "color:blue;font-size:18px", target="_blank")
  
  ########################
  
  
  link_CH7_1=
  a("晨星之光（寇紹涵牧師）：護教學", 
    href="https://www.youtube.com/watch?v=Go1fFWhCGvA&list=PLD4EP15EwxIJL4edtwz18Dj3a3Pygmg_F&index=1",
    style = "color:blue;font-size:18px", target="_blank")
  #
  link_CH7_2=
  a("晨星之光（寇紹涵牧師）：研經培靈（釋經學）", 
    href="https://www.youtube.com/watch?v=talf60KdNfk&list=PLD4EP15EwxIJUZnxPAsRamYn29yPHh0dd",
    style = "color:blue;font-size:18px", target="_blank")
  #
  link_CH7_3=
  a("晨星之光（寇紹涵牧師）：基督教倫理學", 
    href="https://www.youtube.com/watch?v=0xn43O7AcFY&list=PLD4EP15EwxIKJKXnYkiCfW_C2Cs_JGxw_",
    style = "color:blue;font-size:18px", target="_blank")
  #
  link_CH7_4=
  a("基要真理：基要書室", 
    href="http://www.fundamentalbook.com",
    style = "color:blue;font-size:18px", target="_blank")
  #
  #
  link_CH7_5=
    a("Redeemed Zoomer (English)", 
      href="https://www.youtube.com/@redeemedzoomer6053",
      style = "color:blue;font-size:18px", target="_blank")
  #
  
  #
  
  
  ## 護教學
  #
  link_CH7_6=
  a("護教學: 為真道爭辯 （張逸萍)", 
    href="http://www.chineseapologetics.net/index.htm",
    style = "color:blue;font-size:18px", target="_blank")
  #
  link_CH7_7=
  a("Daily Dose Of Wisdom (全英文)", 
    href="https://www.youtube.com/@Daily_Dose_Of_Wisdom",
    style = "color:blue;font-size:18px", target="_blank")
  #
  link_CH7_8=
    a("Apologetics Roadshow (全英文)", 
      href="https://youtube.com/@apologeticsroadshow?si=W-wE2nTfGIZiqNTs",
      style = "color:blue;font-size:18px", target="_blank")
  
  
  ## 基督教神學
  #
  link_CH7_9=
  a("林慈信： 神學導論（信望愛FHL網站）", 
    href="http://ling.fhl.net/rogbook.php?user=ling&bid=301&proc=read&msgno=40",
    style = "color:blue;font-size:18px", target="_blank")
  
  ## 聖經研究與真理造就頻道
  #
  link_CH7_10=
  a("聖光聖經地理資訊網", 
    href="http://biblegeography.holylight.org.tw/index",
    style = "color:blue;font-size:18px", target="_blank")
  #
  link_CH7_11=
  a("信望愛：聖經研經工具（包含各譯本、原文對照等）", 
    href="https://bible.fhl.net/index.html",
    style = "color:blue;font-size:18px", target="_blank")
  #
  link_CH7_12=
  a("晨星之光 (寇紹涵牧師)", 
    href="https://www.youtube.com/@LightofMorningStarStudio/videos",
    style = "color:blue;font-size:18px", target="_blank")
  #
  link_CH7_13=
  a("TGC福音聯盟", 
    href="https://tc.tgcchinese.org",
    style = "color:blue;font-size:18px", target="_blank")
  
  
  #############
  ## 社會亂象與議題
  link_CH7_14=
    a("保守派基督徒新聞報導(揭露社會亂象) - AI NEWS 愛報導", 
      href="https://www.youtube.com/c/AINews777",
      style = "color:blue;font-size:18px", target="_blank")

  ## 好書推薦
  #
  link_CH7_15=
    a("聖經有答案-圖解神學、聖經難題Q&A (出版社：福音文化中心，作者：李健安博士)", 
      href="https://www.crtsbooks.net/product/bibleansweryourquestions.aspx",
      style = "color:blue;font-size:18px", target="_blank")
  
  link_CH7_16=
    a("聖經教義圖解 （出版社：福音文化中心，作者：李健安博士）", 
      href="https://www.crtsbooks.net/product/apictorialbiblicalunderstanding.aspx",
      style = "color:blue;font-size:18px", target="_blank")
  
  link_CH7_17=
  a("圖解簡明范泰爾前設護教學（出版社：福音文化中心，作者：李健安博士）", 
    href="https://www.crtsbooks.net/product/apictorialunderstandingofvantils.aspx",
    style = "color:blue;font-size:18px", target="_blank")
  
  link_CH7_18=
    a("您誦讀使徒信經 懂了嗎？（出版社：福音文化中心，作者：李健安博士）", 
      href="https://www.crtsbooks.net/product/apictorialexpositionoftheapostlescreed.aspx",
      style = "color:blue;font-size:18px", target="_blank")
  
  #
  link_CH7_19=
  a("深知所信（出版社： 中華福音神學，作者：吳道宗）", 
    href="https://shop.campus.org.tw/ProductDetails.aspx?productID=000473309",
    style = "color:blue;font-size:18px", target="_blank")
  #
  link_CH7_20=
    a("以經解經 (出版社：金燈臺，作者：陳終道)", 
      href="https://www.taosheng.com.tw/products/以經解經",
      style = "color:blue;font-size:18px", target="_blank")
  
  link_CH7_21=
  a("天路歷程(The Pilgrim's Progress) - 約翰班揚(John Bunyan)", 
    href="https://shop.campus.org.tw/ProductDetails.aspx?productID=201411124",
    style = "color:blue;font-size:18px", target="_blank")
  #護教通識 - 別異教派 宗教31篇 - 張國良
  link_CH7_22=
  a("護教通識 - 別異教派 宗教31篇 - 張國良", 
    href="https://shop.campus.org.tw/ProductDetails.aspx?productID=000555302",
    style = "color:blue;font-size:18px", target="_blank")
  
  link_Sys_Theology = 
    a("Systematic Theology (Wayne Grudem)",
      href="https://www.waynegrudem.com/systematic-theology",
      style = "color:blue;font-size:18px", target="_blank")
    
  output$Sys_Theology = renderUI({
    
    tagList(link_Sys_Theology)
    
  })
  
  
  ##其他
  #以色列旅遊、自助行與當地生活推薦
  link_CH7_23=
  a("以色列:以色列旅遊、自助行與當地生活推薦", 
    href="https://israelmega.com",
    style = "color:blue;font-size:18px", target="_blank")
  
  link_CH7_24=
    a("伊斯蘭教與基督信仰詳細比較", 
      href="http://www.ysljdj.com",
      style = "color:blue;font-size:18px", target="_blank")
  
  
  RTV = 
    a("RTV Taiwan 改革宗電視台 (特別推薦：《如此我信：威敏斯特信仰告白之邀》、當代悔改真義 - 林慈信)", 
      href="https://www.youtube.com/@RTVTaiwan",
      style = "color:blue;font-size:18px", target="_blank")
  

  output$RTV = renderUI({
    
    tagList(RTV)
    
  })
  

  
  
  
  
  output$cover=renderImage({
    filename <- normalizePath(file.path('cover.jpg'))
    
    # Return a list containing the filename and alt text
    list(src = filename,width="400" ,
         height="550"
    )
  },deleteFile = FALSE)
  
  
 
  
  output$ch1_1=renderImage({
    filename <- normalizePath(file.path('1_1.png'))
    
    # Return a list containing the filename and alt text
    list(src = filename,width="950" ,
         height="450"
    )
  },deleteFile = FALSE)
  
  
  output$ch1_2=renderImage({
    filename <- normalizePath(file.path('1_2.png'))
    
    # Return a list containing the filename and alt text
    list(src = filename,width="950" ,
         height="500"
    )
  },deleteFile = FALSE)
  
  
  
 
 
  
  output$link7_0= renderUI({
    
    tagList(link_CH7_0)
    
  })
  
  output$link7_1= renderUI({
    
    tagList(link_CH7_1)
    
  })
  
  output$link7_2= renderUI({
    
    tagList(link_CH7_2)
    
  })
  
  output$link7_3= renderUI({
    
    tagList(link_CH7_3)
    
  })
  
  output$link7_4= renderUI({
    
    tagList(link_CH7_4)
    
  })
  
  output$link7_5= renderUI({
    
    tagList(link_CH7_5)
    
  })
  
  
  output$link7_6= renderUI({
    
    tagList(link_CH7_6)
    
  })
  
  output$link7_7= renderUI({
    
    tagList(link_CH7_7)
    
  })
  
  output$link7_8= renderUI({
    
    tagList(link_CH7_8)
    
  })
  
  output$link7_9= renderUI({
    
    tagList(link_CH7_9)
    
  })
  
  
  
  output$link7_10= renderUI({
    
    tagList(link_CH7_10)
    
  })
  
  output$link7_11= renderUI({
    
    tagList(link_CH7_11)
    
  })
  
  output$link7_12= renderUI({
    
    tagList(link_CH7_12)
    
  })
  
  output$link7_13= renderUI({
    
    tagList(link_CH7_13)
    
  })
  
  output$link7_14= renderUI({
    
    tagList(link_CH7_14)
    
  })
  
  output$link7_15= renderUI({
    
    tagList(link_CH7_15)
    
  })
  
  output$link7_16= renderUI({
    
    tagList(link_CH7_16)
    
  })
  
  output$link7_17= renderUI({
    
    tagList(link_CH7_17)
    
  })
  
  output$link7_18= renderUI({
    
    tagList(link_CH7_18)
    
  })
  
  output$link7_19= renderUI({
    
    tagList(link_CH7_19)
    
  })
  
  output$link7_20= renderUI({
    
    tagList(link_CH7_20)
    
  })
  
  output$link7_21= renderUI({
    
    tagList(link_CH7_21)
    
  })
  
  output$link7_22= renderUI({
    
    tagList(link_CH7_22)
    
  })
  
  output$link7_23= renderUI({
    
    tagList(link_CH7_23)
    
  })
  
  output$link7_24= renderUI({
    
    tagList(link_CH7_24)
    
  })
  
  
  output$link_LAW= renderUI({
    
    tagList(link_LAW)
    
  })
  
 
  
  
  output$ABR1=renderImage({
    filename <- normalizePath(file.path('ABR1.png'))
    
    # Return a list containing the filename and alt text
    list(src = filename,width="980" ,
         height="420"
    )
  },deleteFile = FALSE)
  
  output$ABR2=renderImage({
    filename <- normalizePath(file.path('ABR2.png'))
    
    # Return a list containing the filename and alt text
    list(src = filename,width="980" ,
         height="420"
    )
  },deleteFile = FALSE)
  
  
  output$ch1_3=renderImage({
    filename <- normalizePath(file.path('1_3.png'))
    
    # Return a list containing the filename and alt text
    list(src = filename,width="950" ,
         height="500"
    )
  },deleteFile = FALSE)
  
  output$ch1_4=renderImage({
    filename <- normalizePath(file.path('1_4.png'))
    
    # Return a list containing the filename and alt text
    list(src = filename,width="950" ,
         height="450"
    )
  },deleteFile = FALSE)
  
  output$ch1_5=renderImage({
    filename <- normalizePath(file.path('1_5.png'))
    
    # Return a list containing the filename and alt text
    list(src = filename,width="950" ,
         height="450"
    )
  },deleteFile = FALSE)
  
  output$ch1_6=renderImage({
    filename <- normalizePath(file.path('1_6.png'))
    
    # Return a list containing the filename and alt text
    list(src = filename,width="950" ,
         height="500"
    )
  },deleteFile = FALSE)
  
  output$ch1_7=renderImage({
    filename <- normalizePath(file.path('1_7.png'))
    
    # Return a list containing the filename and alt text
    list(src = filename,width="950" ,
         height="450"
    )
  },deleteFile = FALSE)
  
  output$ch1_8=renderImage({
    filename <- normalizePath(file.path('1_8.png'))
    
    # Return a list containing the filename and alt text
    list(src = filename,width="950" ,
         height="450"
    )
  },deleteFile = FALSE)
  
  output$ch1_9=renderImage({
    filename <- normalizePath(file.path('1_9.png'))
    
    # Return a list containing the filename and alt text
    list(src = filename,width="950" ,
         height="450"
    )
  },deleteFile = FALSE)
  
  
  
  output$ch2_1=renderImage({
    filename <- normalizePath(file.path('2_1.png'))
    
    # Return a list containing the filename and alt text
    list(src = filename,width="900" ,
         height="450"
    )
  },deleteFile = FALSE)
  
  
  output$ch2_2=renderImage({
    filename <- normalizePath(file.path('2_2.png'))
    
    # Return a list containing the filename and alt text
    list(src = filename,width="900" ,
         height="500"
    )
  },deleteFile = FALSE)
  
  output$ch2_3=renderImage({
    filename <- normalizePath(file.path('2_3.png'))
    
    # Return a list containing the filename and alt text
    list(src = filename,width="900" ,
         height="450"
    )
  },deleteFile = FALSE)
  
  output$ch2_4=renderImage({
    filename <- normalizePath(file.path('2_4.png'))
    
    # Return a list containing the filename and alt text
    list(src = filename,width="900" ,
         height="450"
    )
  },deleteFile = FALSE)
  
  output$ch2_5=renderImage({
    filename <- normalizePath(file.path('2_5.png'))
    
    # Return a list containing the filename and alt text
    list(src = filename,width="750" ,
         height="500"
    )
  },deleteFile = FALSE)
  
  output$ch2_6=renderImage({
    filename <- normalizePath(file.path('2_6.png'))
    
    # Return a list containing the filename and alt text
    list(src = filename,width="900" ,
         height="500"
    )
  },deleteFile = FALSE)
  
  output$ch2_7=renderImage({
    filename <- normalizePath(file.path('2_7.png'))
    
    # Return a list containing the filename and alt text
    list(src = filename,width="900" ,
         height="500"
    )
  },deleteFile = FALSE)
  
  output$ch2_8=renderImage({
    filename <- normalizePath(file.path('2_8.png'))
    
    # Return a list containing the filename and alt text
    list(src = filename,width="900" ,
         height="500"
    )
  },deleteFile = FALSE)
  
  output$ch2_9=renderImage({
    filename <- normalizePath(file.path('2_9.png'))
    
    # Return a list containing the filename and alt text
    list(src = filename,width="900" ,
         height="450"
    )
  },deleteFile = FALSE)
  
  output$ch2_10=renderImage({
    filename <- normalizePath(file.path('2_10.png'))
    
    # Return a list containing the filename and alt text
    list(src = filename,width="700" ,
         height="1000"
    )
  },deleteFile = FALSE)
  

  
  
  output$UNIVERSITY=renderImage({
    filename <- normalizePath(file.path('Univ.png'))
    
    # Return a list containing the filename and alt text
    list(src = filename,width="600" ,
         height="500"
    )
  },deleteFile = FALSE)
  
  
  
  
  })