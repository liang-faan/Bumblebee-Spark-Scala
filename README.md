# This is capstone project for Group#3.

## Spark DataFrame Remove "null" string from csv
```
    val nonNullDf = df.na.fill("");
    //nonNulldf has replaced all string "null" to ""
```

## Todo fill last know observation in spar
```
https://stackoverflow.com/questions/40592207/spark-scala-fill-nan-with-last-good-observation
```


## Spark groupby and agg fuciton
```
Agg function requires specify each column to be clubbed. 
there is no way dynamic the column name and auto collect_list. 
```