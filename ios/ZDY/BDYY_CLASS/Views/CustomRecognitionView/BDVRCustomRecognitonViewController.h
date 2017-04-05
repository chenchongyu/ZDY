//
//  BDVRCustomRecognitonViewController.h
//  BDVRClientSample
//
//  Created by Baidu on 13-9-25
//  Copyright 2013 Baidu Inc. All rights reserved.
//

// 头文件
#import <UIKit/UIKit.h>
#import "BDVoiceRecognitionClient.h"

// 前向声明
@class ViewController;

// @class - BDVRCustomRecognitonViewController
// @brief - 语音搜索界面的实现类
@interface BDVRCustomRecognitonViewController : UIViewController<MVoiceRecognitionClientDelegate>
{
	UIImageView *_dialog;
    ViewController *clientSampleViewController;
    
    NSTimer *_voiceLevelMeterTimer; // 获取语音音量界别定时器
}

// 属性
@property (nonatomic, retain) UIImageView *dialog;
@property (nonatomic, assign) ViewController *clientSampleViewController;
@property (nonatomic, retain) NSTimer *voiceLevelMeterTimer;

// 方法
- (void)cancel:(id)sender;

@end // BDVRCustomRecognitonViewController
