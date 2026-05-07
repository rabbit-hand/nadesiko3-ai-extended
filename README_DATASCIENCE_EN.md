# Nadesiko3 Data Science Extension

## Overview

Implemented Python-like data science functionality in Nadesiko3. NumPy, Pandas, and Scikit-Learn-like features are available in Japanese.

## Added Plugins

### 1. plugin_datascience.mts - Data Processing (NumPy-style)

**Array Operations:**
- `配列作成` (Create Array): Create array with specified size
- `ゼロ配列` (Zero Array): Array initialized with zeros
- `配列1埋` (Ones Array): Array initialized with ones
- `範囲配列` (Range Array): Numeric array within specified range
- `配列形状` (Array Shape): Get array shape
- `配列リサイズ` (Array Resize): Resize array
- `配列連結` (Array Concat): Concatenate arrays

**Math Functions:**
- `合計` (Sum): Sum of array elements
- `平均` (Mean): Mean value of array
- `最大値` (Max): Maximum value in array
- `最小値` (Min): Minimum value in array
- `標準偏差` (Std Dev): Standard deviation
- `分散` (Variance): Variance
- `配列要素積` (Product): Product of array elements
- `配列累積和` (Cumulative Sum): Cumulative sum

**Statistical Functions:**
- `中央値` (Median): Median value
- `最頻値` (Mode): Mode value
- `相関係数` (Correlation): Correlation coefficient

### 2. plugin_statistics.mts - Statistical Analysis

**Descriptive Statistics:**
- `要約統計量` (Summary Statistics): Basic statistical summary

**Probability Distributions:**
- `正規分布PDF` (Normal PDF): Normal distribution probability density function
- `正規分布CDF` (Normal CDF): Normal distribution cumulative distribution function

**Hypothesis Testing:**
- `t検定` (T-Test): T-test implementation
- `カイ二乗検定` (Chi-Square Test): Chi-square test implementation

**Correlation Analysis:**
- `ピアソン相関` (Pearson Correlation): Pearson correlation coefficient
- `スピアマン相関` (Spearman Correlation): Spearman rank correlation

### 3. plugin_machinelearning.mts - Machine Learning

**Data Preprocessing:**
- `データ正規化` (Data Normalization): Normalize data
- `データ標準化` (Data Standardization): Standardize data

**Supervised Learning:**
- `線形回帰学習` (Linear Regression Train): Train linear regression model
- `線形回帰予測` (Linear Regression Predict): Predict with linear regression
- `ロジスティック回帰学習` (Logistic Regression Train): Train logistic regression
- `ロジスティック回帰予測` (Logistic Regression Predict): Predict with logistic regression

**Unsupervised Learning:**
- `K近傍法分類` (K-NN Classification): K-nearest neighbors classification
- `K平均法クラスタリング` (K-Means Clustering): K-means clustering

**Evaluation Metrics:**
- `平均二乗誤差` (MSE): Mean squared error
- `平均絶対誤差` (MAE): Mean absolute error

## Usage Examples

### Basic Array Operations
```nako3
# Load plugin
!「plugin_datascience.mjs」を取り込む。

# Create arrays
zeros = 5のゼロ配列    # [0,0,0,0,0]
ones = 4の配列1埋      # [1,1,1,1]
range = 1から5まで範囲配列  # [1,2,3,4,5]

# Statistical calculations
data = [1,2,3,4,5]
mean = dataの平均        # 3
std = dataの標準偏差     # 1.414...
correlation = [1,2,3]と[2,4,6]の相関係数  # 1.0
```

### Advanced Analysis
```nako3
# Regression analysis
X = [1,2,3,4,5]
Y = [2,4,6,8,10]
model = XとYで回帰直線
slope = model["slope"]      # 2.0
intercept = model["intercept"]  # 0.0

# Prediction
new_x = 6
predicted_y = slope * new_x + intercept  # 12.0
```

## Testing

Run the data science tests:
```bash
npm run test:datascience
```

Run the demos:
```bash
npm run demo:datascience
node src/cnako3.mjs demo/datascience_demo_manual.nako3  # Japanese
node src/cnako3.mjs demo/datascience_demo_en.nako3      # English
```

## Features

✅ **22 test cases passing**
✅ **NumPy-like array operations**
✅ **Statistical functions**
✅ **Machine learning basics**
✅ **Japanese and English documentation**
✅ **Complete demo examples**

## Performance

- Efficient array operations using JavaScript
- Statistical calculations optimized for speed
- Memory-efficient implementations

## Compatibility

- Node.js environment
- Browser environment (wnako3)
- Compatible with existing Nadesiko3 plugins

## Future Enhancements

- Deep learning support
- Time series analysis
- Natural language processing
- Advanced machine learning algorithms

---

**🚀 Nadesiko3 now has Python-like data science capabilities!**  
**📚 Perfect for education, research, and practical applications!**
